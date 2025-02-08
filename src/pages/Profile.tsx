import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GeneralSettings } from "@/components/profile/GeneralSettings";
import { Loader2, User } from "lucide-react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { authService } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

const ProfileSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

const UserInfoHeader = memo(({ user, t }: { user: any; t: any }) => (
  <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <User className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
      </div>
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          {t.profile.title}
        </h1>
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
));

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
