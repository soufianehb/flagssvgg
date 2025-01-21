import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface SignupHeaderProps {
  t: any;
}

export const SignupHeader = ({ t }: SignupHeaderProps) => {
  return (
    <Link
      to="/"
      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      {t.signup.buttons.backHome}
    </Link>
  );
};