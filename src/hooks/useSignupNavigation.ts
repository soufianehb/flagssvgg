import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NavigationState {
  currentStep: number;
  history: number[];
}

interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export const useSignupNavigation = (
  validateCurrentStep: () => StepValidation,
  onStepChange?: (step: number) => void
) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentStep: 1,
    history: [1]
  });
  
  const { toast } = useToast();

  const goToStep = (step: number) => {
    const validation = validateCurrentStep();
    
    if (!validation.isValid) {
      // Afficher les erreurs de validation
      const errorMessages = Object.values(validation.errors).join('\n');
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: errorMessages
      });
      return false;
    }

    // Sauvegarder l'état actuel dans l'historique
    setNavigationState(prev => ({
      currentStep: step,
      history: [...prev.history, step]
    }));

    // Notifier le changement d'étape
    onStepChange?.(step);
    return true;
  };

  const goBack = () => {
    setNavigationState(prev => {
      const newHistory = [...prev.history];
      newHistory.pop(); // Retire l'étape actuelle
      const previousStep = newHistory[newHistory.length - 1] || 1;
      
      // Notifier le changement d'étape
      onStepChange?.(previousStep);
      
      return {
        currentStep: previousStep,
        history: newHistory
      };
    });
  };

  const canGoBack = navigationState.history.length > 1;

  return {
    currentStep: navigationState.currentStep,
    goToStep,
    goBack,
    canGoBack
  };
};