
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { SignupForm } from "@/components/signup/SignupForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t.signup.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t.signup.subtitle}
            </p>
          </div>

          <SignupForm />

          <div className="space-y-4">
            <p className="text-center text-gray-600">
              {t.signup.buttons.login}
            </p>
            <Link to="/login">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
                variant="default"
              >
                {t.nav.login}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="font-medium text-accent hover:text-accent/90"
            >
              {t.signup.buttons.backHome}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
