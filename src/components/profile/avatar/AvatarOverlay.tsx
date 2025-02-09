
import { Upload, Loader2 } from "lucide-react";

interface AvatarOverlayProps {
  isHovering: boolean;
  isUploading: boolean;
}

export const AvatarOverlay = ({ isHovering, isUploading }: AvatarOverlayProps) => {
  if (!isHovering && !isUploading) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
      {isUploading ? (
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      ) : (
        <Upload className="h-8 w-8 text-white" />
      )}
    </div>
  );
};
