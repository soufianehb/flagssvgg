import { useState, useCallback, useRef } from 'react';
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
  const validateRef = useRef(validateCurrentStep);
  const onStepChangeRef = useRef(onStepChange);
  const onErrorRef = useRef(onError);

  // Mettre à jour les refs quand les callbacks changent
  validateRef.current = validateCurrentStep;
  onStepChangeRef.current = onStepChange;
  onErrorRef.current = onError;

  const goToStep = useCallback(async (step: number) => {
    try {
      const validation = validateRef.current();
      
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

      if (onStepChangeRef.current) {
        await onStepChangeRef.current(step);
      }
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors du changement d'étape",
        description: "Une erreur est survenue, retour à l'étape précédente"
      });
      
      if (onErrorRef.current) {
        onErrorRef.current(state.currentStep);
      }
      return false;
    }
  }, [toast]); // Seule dépendance nécessaire car on utilise des refs pour le reste

  const goBack = useCallback(() => {
    setState(prevState => {
      const newHistory = [...prevState.history];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1] || 1;
      
      if (onStepChangeRef.current) {
        onStepChangeRef.current(previousStep);
      }
      
      return {
        currentStep: previousStep,
        history: newHistory
      };
    });
  }, []); // Pas de dépendances car on utilise setState avec callback et ref

  return {
    currentStep: state.currentStep,
    goToStep,
    goBack,
    canGoBack: state.history.length > 1
  };
};