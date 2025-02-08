
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GeneralSettings } from "@/components/profile/GeneralSettings";
import { Loader2, User } from "lucide-react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Memoize static components
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

// Loading skeleton component
const ProfileSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

// User info header component
const UserInfoHeader = memo(({ user, t }: { user: any; t: any }) => (
  <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <div className="flex items-center gap-4">
      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <User className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.profile.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-500">{user?.email}</p>
      </div>
    </div>
  </div>
));

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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

