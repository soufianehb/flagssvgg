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
  onStepChange?: (step: number) => void,
  onError?: (step: number) => void
) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentStep: 1,
    history: [1]
  });
  
  const { toast } = useToast();

  const goToStep = async (step: number) => {
    try {
      const validation = validateCurrentStep();
      
      if (!validation.isValid) {
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
      await onStepChange?.(step);
      return true;
    } catch (error) {
      // En cas d'erreur, notifier et déclencher le rollback
      toast({
        variant: "destructive",
        title: "Erreur lors du changement d'étape",
        description: "Une erreur est survenue, retour à l'étape précédente"
      });
      
      onError?.(navigationState.currentStep);
      return false;
    }
  };

  const goBack = () => {
    setNavigationState(prev => {
      const newHistory = [...prev.history];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1] || 1;
      
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