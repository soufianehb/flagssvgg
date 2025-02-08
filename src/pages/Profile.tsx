
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

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tabs defaultValue="general" className="w-full">
            {/* Desktop Tabs */}
            <div className="border-b border-gray-100 hidden sm:block">
              <TabsList className="w-full flex gap-4 p-4 bg-transparent">
                <TabsTrigger 
                  value="general"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base py-2.5 transition-colors"
                >
                  {t.profile.tabs.general}
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base py-2.5 transition-colors"
                >
                  {t.profile.tabs.security}
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base py-2.5 transition-colors"
                >
                  {t.profile.tabs.preferences}
                </TabsTrigger>
                <TabsTrigger 
                  value="listings"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base py-2.5 transition-colors"
                >
                  {t.profile.tabs.listings.title}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Mobile Tabs */}
            <div className="border-b border-gray-100 block sm:hidden">
              <TabsList className="w-full overflow-x-auto flex gap-2 p-3 bg-transparent scrollbar-hide">
                <TabsTrigger 
                  value="general"
                  className="shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm px-4 py-2.5 transition-colors"
                >
                  {t.profile.tabs.general}
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm px-4 py-2.5 transition-colors"
                >
                  {t.profile.tabs.security}
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm px-4 py-2.5 transition-colors"
                >
                  {t.profile.tabs.preferences}
                </TabsTrigger>
                <TabsTrigger 
                  value="listings"
                  className="shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-sm px-4 py-2.5 transition-colors"
                >
                  {t.profile.tabs.listings.title}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="px-4 sm:px-6 pt-6 pb-8">
              <TabsContent value="general" className="mt-0 focus-visible:outline-none">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t.profile.general.title}
                  </h2>
                  <GeneralSettings />
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-0 focus-visible:outline-none">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t.profile.security.title}
                  </h2>
                  <SecuritySettings />
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="mt-0 focus-visible:outline-none">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t.profile.preferences.title}
                  </h2>
                  <PreferenceSettings />
                </div>
              </TabsContent>

              <TabsContent value="listings" className="mt-0 focus-visible:outline-none">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t.profile.tabs.listings.title}
                  </h2>
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

