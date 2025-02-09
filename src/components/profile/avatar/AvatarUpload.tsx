import { useState } from "react";
import { User, Upload, Loader2, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTranslation } from "@/lib/i18n";

interface AvatarUploadProps {
  user: any;
  onUploadSuccess?: () => void;
}

export const AvatarUpload = ({ user, onUploadSuccess }: AvatarUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const minDimension = 200; // Minimum width/height requirement
        const isValid = img.width >= minDimension && img.height >= minDimension;
        URL.revokeObjectURL(img.src);
        resolve(isValid);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Type de fichier non valide",
          description: "Veuillez sélectionner une image JPG ou GIF",
        });
        return;
      }
      
      // Validate file size (100KB)
      const maxSize = 100 * 1024; // 100KB in bytes
      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "L'image doit faire moins de 100KB",
        });
        return;
      }

      // Validate image dimensions
      const hasSufficientDimensions = await validateImageDimensions(file);
      if (!hasSufficientDimensions) {
        toast({
          variant: "destructive",
          title: "Dimensions insuffisantes",
          description: "L'image doit faire au minimum 200x200 pixels",
        });
        return;
      }

      setIsUploading(true);
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Image mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });

      onUploadSuccess?.();
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'upload",
        description: error.message || "Une erreur est survenue lors de l'upload de l'image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <label 
          htmlFor="avatar-upload"
          className="cursor-pointer block h-24 sm:h-32 w-24 sm:w-32 rounded-full bg-primary/10 overflow-hidden"
        >
          {user?.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <User className="h-12 sm:h-16 w-12 sm:w-16 text-primary" />
            </div>
          )}
          
          {/* Overlay on hover */}
          {isHovering && !isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <Upload className="h-8 w-8 text-white" />
            </div>
          )}
          
          {/* Loading spinner */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
        </label>
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept=".jpg,.jpeg,.gif"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </div>

      {/* Help Information HoverCard */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <button 
            className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50"
            type="button"
          >
            <HelpCircle className="w-5 h-5 text-accent hover:text-accent/80" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">{t.profile.settings.avatar.uploadInstructions}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">{t.profile.settings.avatar.specifications.title}</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="font-medium">{t.profile.settings.avatar.specifications.format}</span> 
                  {t.profile.settings.avatar.specifications.formatTypes}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">{t.profile.settings.avatar.specifications.maxSize}</span> 
                  {t.profile.settings.avatar.specifications.maxSizeValue}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">{t.profile.settings.avatar.specifications.minDimensions}</span> 
                  {t.profile.settings.avatar.specifications.minDimensionsValue}
                </li>
              </ul>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
