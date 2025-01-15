import { useState } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';

type StepData = PersonalData | ProfessionalData | SecurityData;
type StepType = 'personal' | 'professional' | 'security';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface BackupState {
  [key: string]: StepData;
}

export const useFormIntegrity = () => {
  const [backupData, setBackupData] = useState<BackupState>({});

  const validateStepIntegrity = (step: StepType, data: StepData): ValidationResult => {
    const errors: string[] = [];

    // Vérification de l'intégrité des données
    if (!data || typeof data !== 'object') {
      errors.push('Les données sont invalides ou corrompues');
      return { isValid: false, errors };
    }

    // Vérifications spécifiques par étape
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

  const backupStepData = (step: StepType, data: StepData) => {
    setBackupData(prev => ({
      ...prev,
      [step]: JSON.parse(JSON.stringify(data)) // Deep copy to prevent contamination
    }));
  };

  const rollbackStep = (step: StepType): StepData | null => {
    return backupData[step] || null;
  };

  const preventDataContamination = (data: StepData): StepData => {
    return JSON.parse(JSON.stringify(data));
  };

  return {
    validateStepIntegrity,
    backupStepData,
    rollbackStep,
    preventDataContamination
  };
};