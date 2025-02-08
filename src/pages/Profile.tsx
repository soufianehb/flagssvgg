
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
import { Loader2, User } from "lucide-react";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
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

        <div className="bg-white rounded-lg shadow-sm">
          <Tabs defaultValue="general" className="w-full">
            <div className="px-3 sm:px-6 pt-3 sm:pt-4">
              <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-gray-50/80 sm:bg-gray-100/50 py-2 sm:py-4">
                <TabsTrigger 
                  value="general"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm sm:text-base py-2"
                >
                  {t.profile.tabs.general}
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm sm:text-base py-2"
                >
                  {t.profile.tabs.security}
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm sm:text-base py-2"
                >
                  {t.profile.tabs.preferences}
                </TabsTrigger>
                <TabsTrigger 
                  value="listings"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm sm:text-base py-2"
                >
                  {t.profile.tabs.listings.title}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 sm:p-6">
              <TabsContent value="general" className="mt-0">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t.profile.general.title}</h2>
                  <GeneralSettings />
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t.profile.security.title}</h2>
                  <SecuritySettings />
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t.profile.preferences.title}</h2>
                  <PreferenceSettings />
                </div>
              </TabsContent>

              <TabsContent value="listings" className="mt-0">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t.profile.tabs.listings.title}</h2>
                  <UserListings />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

