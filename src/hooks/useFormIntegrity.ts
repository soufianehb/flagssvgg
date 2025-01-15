import { useState } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';

interface StepData {
  personal?: PersonalData;
  professional?: ProfessionalData;
  security?: SecurityData;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useFormIntegrity = () => {
  const [backupData, setBackupData] = useState<StepData>({});

  const validateStepIntegrity = (
    step: 'personal' | 'professional' | 'security',
    data: PersonalData | ProfessionalData | SecurityData
  ): ValidationResult => {
    const errors: string[] = [];

    switch (step) {
      case 'personal':
        const personalData = data as PersonalData;
        if (!personalData.firstName || !personalData.lastName || !personalData.email) {
          errors.push('Données personnelles incomplètes');
        }
        break;

      case 'professional':
        const professionalData = data as ProfessionalData;
        if (!professionalData.address || !professionalData.city || !professionalData.country) {
          errors.push('Données professionnelles incomplètes');
        }
        break;

      case 'security':
        const securityData = data as SecurityData;
        if (!securityData.password || !securityData.confirmPassword) {
          errors.push('Données de sécurité incomplètes');
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const backupStepData = (
    step: 'personal' | 'professional' | 'security',
    data: PersonalData | ProfessionalData | SecurityData
  ) => {
    setBackupData(prev => ({
      ...prev,
      [step]: { ...data }
    }));
  };

  const rollbackStep = (step: 'personal' | 'professional' | 'security'): any => {
    return backupData[step];
  };

  const preventDataContamination = (
    step: 'personal' | 'professional' | 'security',
    data: PersonalData | ProfessionalData | SecurityData
  ): PersonalData | ProfessionalData | SecurityData => {
    // Créer une copie profonde pour éviter la contamination
    return JSON.parse(JSON.stringify(data));
  };

  return {
    validateStepIntegrity,
    backupStepData,
    rollbackStep,
    preventDataContamination
  };
};