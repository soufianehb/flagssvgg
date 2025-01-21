import { LanguageSelector } from "./LanguageSelector";
import { SignupHeader } from "./SignupHeader";
import { StepProgress } from "./StepProgress";
import { SignupFooter } from "./SignupFooter";
import { SignupContent } from "./SignupContent";

interface Language {
  code: 'en' | 'fr' | 'es';
  label: string;
}

interface SignupContainerProps {
  t: any;
  language: string;
  languages: Language[];
  currentStep: number;
  totalSteps: number;
  onLanguageChange: (lang: 'en' | 'fr' | 'es') => void;
  onLoginClick: () => void;
  goBack: () => void;
  handleNextStep: () => void;
  handleSubmit: () => void;
}

export const SignupContainer = ({
  t,
  language,
  languages,
  currentStep,
  totalSteps,
  onLanguageChange,
  onLoginClick,
  goBack,
  handleNextStep,
  handleSubmit
}: SignupContainerProps) => {
  return (
    <div className="max-w-md w-full space-y-8">
      <SignupHeader t={t} />
      
      <LanguageSelector
        currentLanguage={language}
        languages={languages}
        t={t}
        onLanguageChange={onLanguageChange}
      />

      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <StepProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          t={t}
        />

        <SignupContent
          currentStep={currentStep}
          t={t}
          goBack={goBack}
          handleNextStep={handleNextStep}
          handleSubmit={handleSubmit}
        />

        <SignupFooter
          t={t}
          onLoginClick={onLoginClick}
        />
      </div>
    </div>
  );
};