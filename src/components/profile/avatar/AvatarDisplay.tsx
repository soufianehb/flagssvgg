
import { User } from "lucide-react";

interface AvatarDisplayProps {
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

export const AvatarDisplay = ({ avatarUrl, size = "md" }: AvatarDisplayProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 sm:h-32 w-24 sm:w-32",
    lg: "h-32 sm:h-40 w-32 sm:w-40"
  };

  const iconSizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 sm:h-16 w-12 sm:w-16",
    lg: "h-16 sm:h-20 w-16 sm:w-20"
  };

  return avatarUrl ? (
    <img 
      src={avatarUrl} 
      alt="Profile" 
      className={`${sizeClasses[size]} object-cover`}
    />
  ) : (
    <div className={`h-full w-full flex items-center justify-center`}>
      <User className={`${iconSizeClasses[size]} text-primary`} />
    </div>
  );
};
