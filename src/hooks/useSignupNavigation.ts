import { useState, useCallback, useRef } from 'react';

interface NavigationState {
  currentStep: number;
  history: number[];
}

export const useSignupNavigation = (
  onStepChange?: (step: number) => void
) => {
  const [state, setState] = useState<NavigationState>({
    currentStep: 1,
    history: [1]
  });
  
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;

  const goToStep = useCallback(async (step: number) => {
    setState(prevState => ({
      currentStep: step,
      history: [...prevState.history, step]
    }));

    if (onStepChangeRef.current) {
      await onStepChangeRef.current(step);
    }
    
    return true;
  }, []); 

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
  }, []);

  return {
    currentStep: state.currentStep,
    goToStep,
    goBack,
    canGoBack: state.history.length > 1
  };
};