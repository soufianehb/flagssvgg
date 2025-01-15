import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NavigationState {
  currentStep: number;
  history: number[];
}

export const useSignupNavigation = (
  validateCurrentStep: () => { isValid: boolean; errors: Record<string, string> }
) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentStep: 1,
    history: [1]
  });
  const { toast } = useToast();

  const goToStep = (step: number) => {
    const validation = validateCurrentStep();
    
    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant de continuer"
      });
      return false;
    }

    setNavigationState(prev => ({
      currentStep: step,
      history: [...prev.history, step]
    }));
    return true;
  };

  const goBack = () => {
    setNavigationState(prev => {
      const newHistory = [...prev.history];
      newHistory.pop(); // Retire l'étape actuelle
      const previousStep = newHistory[newHistory.length - 1] || 1;
      
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