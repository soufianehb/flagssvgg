import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const form = useForm();

  const onSubmit = async (data: any) => {
    try {
      await signup(data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-gray-600 mt-2">
            Remplissez le formulaire ci-dessous pour créer votre compte
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...form.register("email", { required: "Email is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                {...form.register("password", { required: "Password is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1 h-11"
                >
                  Précédent
                </Button>
                <Button type="submit" className="flex-1 h-11">
                  Créer mon compte
                </Button>
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Vous avez déjà un compte ?
                </span>
                <Link to="/login">
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary h-11 w-full"
                  >
                    Connectez-vous
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
