
import { useEffect, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GeneralSettings } from "@/components/profile/GeneralSettings";
import { Loader2, User, Upload } from "lucide-react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { authService } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

const ProfileSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

const UserInfoHeader = memo(({ user, t }: { user: any; t: any }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Type de fichier non valide",
          description: "Veuillez sélectionner une image (JPG, PNG)",
        });
        return;
      }
      
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "L'image doit faire moins de 2MB",
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
    <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <label 
            htmlFor="avatar-upload"
            className="cursor-pointer block h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-primary/10 overflow-hidden"
          >
            {user?.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <User className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
              </div>
            )}
            
            {/* Overlay on hover */}
            {isHovering && !isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                <Upload className="h-5 w-5 text-white" />
              </div>
            )}
            
            {/* Loading spinner */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.profile.title}</h1>
          <p className="text-gray-700 font-medium">
            {user?.user_metadata?.company_name || 'Company Name Not Set'}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {user?.email}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {user?.user_metadata?.phoneNumber || user?.user_metadata?.businessPhone || 'No Phone Number Set'}
          </p>
        </div>
      </div>
    </div>
  );
});

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login...");
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please log in again to continue.",
          });
          await logout();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please log in again to continue.",
        });
        await logout();
        navigate("/login");
      }
    };

    checkSession();

    // Set up interval to periodically check session
    const intervalId = setInterval(checkSession, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [navigate, logout, toast]);

  if (isAuthenticated === undefined) {
    return <ProfileSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MemoizedHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <UserInfoHeader user={user} t={t} />

        <ErrorBoundary>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <GeneralSettings />
          </div>
        </ErrorBoundary>
      </main>

      <MemoizedFooter />
    </div>
  );
};

export default Profile;
