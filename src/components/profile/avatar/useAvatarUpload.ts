
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/lib/i18n";

interface UseAvatarUploadProps {
  user: any;
  onAvatarUpdate?: (url: string) => void;
}

export const useAvatarUpload = ({ user, onAvatarUpdate }: UseAvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

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
          title: t.profile.avatar.upload.error.title,
          description: t.profile.avatar.upload.error.invalidType,
        });
        return;
      }
      
      const maxSize = 100 * 1024;
      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: t.profile.avatar.upload.error.title,
          description: t.profile.avatar.upload.error.tooLarge,
        });
        return;
      }

      const hasSufficientDimensions = await validateImageDimensions(file);
      if (!hasSufficientDimensions) {
        toast({
          variant: "destructive",
          title: t.profile.avatar.upload.error.title,
          description: t.profile.avatar.upload.error.invalidType,
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
        title: t.profile.avatar.upload.success.title,
        description: t.profile.avatar.upload.success.message,
      });
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: t.profile.avatar.upload.error.title,
        description: error.message || t.profile.avatar.upload.error.message,
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
