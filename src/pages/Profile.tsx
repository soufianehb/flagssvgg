
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GeneralSettings } from "@/components/profile/GeneralSettings";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { authService } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { UserInfoHeader } from "@/components/profile/UserInfoHeader";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

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
        <UserInfoHeader user={user} />

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

