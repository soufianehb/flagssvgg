
import { useState } from "react";
import { AvatarDisplay } from "./AvatarDisplay";
import { AvatarOverlay } from "./AvatarOverlay";
import { AvatarHelpCard } from "./AvatarHelpCard";
import { useAvatarUpload } from "./useAvatarUpload";

interface AvatarUploadProps {
  user: any;
  avatarUrl?: string | null;
  onAvatarUpdate?: (url: string) => void;
}

export const AvatarUpload = ({ user, avatarUrl, onAvatarUpdate }: AvatarUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isUploading, handleImageUpload } = useAvatarUpload({ user, onAvatarUpdate });

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
          <AvatarDisplay avatarUrl={avatarUrl} />
          <AvatarOverlay isHovering={isHovering} isUploading={isUploading} />
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

      <AvatarHelpCard />
    </div>
  );
};
