
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GeneralSettings } from "@/components/profile/GeneralSettings";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { PreferenceSettings } from "@/components/profile/PreferenceSettings";
import { UserListings } from "@/components/profile/UserListings";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Show loading state while we determine auth status
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // Only render content when we're sure the user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {t.profile.title}
        </h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="general">{t.profile.tabs.general}</TabsTrigger>
            <TabsTrigger value="security">{t.profile.tabs.security}</TabsTrigger>
            <TabsTrigger value="preferences">{t.profile.tabs.preferences}</TabsTrigger>
            <TabsTrigger value="listings">{t.profile.tabs.listings.title}</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t.profile.general.title}</h2>
              <GeneralSettings />
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t.profile.security.title}</h2>
              <SecuritySettings />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t.profile.preferences.title}</h2>
              <PreferenceSettings />
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t.profile.tabs.listings.title}</h2>
              <UserListings />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
