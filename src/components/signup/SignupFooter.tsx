import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface SignupFooterProps {
  t: any;
  onLoginClick: () => void;
}

export const SignupFooter = ({ t, onLoginClick }: SignupFooterProps) => {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">{t.signup.buttons.login}</p>
      <Button
        type="button"
        onClick={onLoginClick}
        className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white mt-2"
      >
        <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
        {t.login.submit}
      </Button>
    </div>
  );
};