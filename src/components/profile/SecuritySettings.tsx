
import { EmailForm } from "./security/EmailForm";
import { PasswordForm } from "./security/PasswordForm";

export function SecuritySettings() {
  return (
    <div className="space-y-10">
      <EmailForm />
      <PasswordForm />
    </div>
  );
}
