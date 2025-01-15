import { useState, useCallback } from 'react';
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
  const [state, setState] = useState<NavigationState>({
    currentStep: 1,
    history: [1]
  });
  
  const { toast } = useToast();

  const goToStep = useCallback(async (step: number) => {
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

      setState(prevState => ({
        currentStep: step,
        history: [...prevState.history, step]
      }));

      if (onStepChange) {
        await onStepChange(step);
      }
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors du changement d'étape",
        description: "Une erreur est survenue, retour à l'étape précédente"
      });
      
      if (onError) {
        onError(state.currentStep);
      }
      return false;
    }
  }, [validateCurrentStep, toast, onStepChange, onError, state.currentStep]);

  const goBack = useCallback(() => {
    setState(prevState => {
      const newHistory = [...prevState.history];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1] || 1;
      
      if (onStepChange) {
        onStepChange(previousStep);
      }
      
      return {
        currentStep: previousStep,
        history: newHistory
      };
    });
  }, [onStepChange]);

  return {
    currentStep: state.currentStep,
    goToStep,
    goBack,
    canGoBack: state.history.length > 1
  };
};