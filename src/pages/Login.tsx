
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/login/LoginForm";
import { LanguageSelector } from "@/components/login/LanguageSelector";

const LoginContent = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col" role="main">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors mb-4"
            aria-label={t.login.backHome}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.login.backHome}
          </Link>

          <div className="flex justify-end">
            <LanguageSelector />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900" tabIndex={0}>
                {t.login.title}
              </h1>
              <p className="mt-2 text-sm text-gray-600" tabIndex={0}>
                {t.login.subtitle}
              </p>
            </div>

            <LoginForm />

            <div className="text-center mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                {t.login.noAccount}
              </p>
              <Link to="/signup">
                <Button
                  type="button"
                  className="w-full flex justify-center items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.login.signUp}
                </Button>
              </Link>
            </div>

            <div className="text-center space-y-2 text-sm text-gray-600">
              <p>
                <Link to="/terms" className="text-accent hover:text-accent/80 underline">
                  {t.login.legal.terms}
                </Link>
              </p>
              <p>
                <Link to="/privacy" className="text-accent hover:text-accent/80 underline">
                  {t.login.legal.privacy}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Wrap the login content with AuthProvider
const Login = () => {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
};

export default Login;
