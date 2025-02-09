
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseAvatarUploadProps {
  user: any;
  onAvatarUpdate?: (url: string) => void;
}

export const useAvatarUpload = ({ user, onAvatarUpdate }: UseAvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const minDimension = 200;
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
      
      const validTypes = ['image/jpeg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Type de fichier non valide",
          description: "Veuillez sélectionner une image JPG ou GIF",
        });
        return;
      }
      
      const maxSize = 100 * 1024;
      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "L'image doit faire moins de 100KB",
        });
        return;
      }

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
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      onAvatarUpdate?.(publicUrl);

      toast({
        title: "Image mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });
      
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

  return {
    isUploading,
    handleImageUpload
  };
};
