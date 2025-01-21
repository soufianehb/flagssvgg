import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  t: any;
}

export const StepProgress = ({ currentStep, totalSteps, t }: StepProgressProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{t.signup.title}</h1>
      <p className="mt-2 text-gray-600">
        {t.signup.steps.progress
          .replace('{step}', currentStep.toString())
          .replace('{total}', totalSteps.toString())}
      </p>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};