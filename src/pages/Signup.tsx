
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { SignupForm } from "@/components/signup/SignupForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
          </div>

          <SignupForm />

          <div className="mt-2 text-center text-sm">
            <p className="text-gray-600">
              {t.signup.buttons.login}{' '}
              <Link to="/login" className="font-medium text-accent hover:text-accent/90">
                {t.nav.login}
              </Link>
            </p>
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
