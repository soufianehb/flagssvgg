import { useState, useEffect } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { useFormIntegrity } from './useFormIntegrity';

const STORAGE_KEY = 'signup_form_data';

interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export const useSignupFormData = () => {
  const [personalData, setPersonalData] = useState<PersonalData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_personal`);
    return saved ? JSON.parse(saved) : { firstName: '', lastName: '', email: '' };
  });

  const [professionalData, setProfessionalData] = useState<ProfessionalData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_professional`);
    return saved ? JSON.parse(saved) : {
      address: '',
      zipCode: '',
      city: '',
      country: '',
      companyName: '',
      phoneNumber: '',
      businessPhone: ''
    };
  });

  const [securityData, setSecurityData] = useState<SecurityData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_security`);
    return saved ? JSON.parse(saved) : {
      password: '',
      confirmPassword: '',
      terms: false
    };
  });

  const {
    validateStepIntegrity,
    backupStepData,
    rollbackStep,
    preventDataContamination
  } = useFormIntegrity();

  // Sauvegarde automatique des données avec protection contre la contamination
  useEffect(() => {
    const cleanData = preventDataContamination(personalData);
    localStorage.setItem(`${STORAGE_KEY}_personal`, JSON.stringify(cleanData));
  }, [personalData]);

  useEffect(() => {
    const cleanData = preventDataContamination(professionalData);
    localStorage.setItem(`${STORAGE_KEY}_professional`, JSON.stringify(cleanData));
  }, [professionalData]);

  useEffect(() => {
    const cleanData = preventDataContamination(securityData);
    localStorage.setItem(`${STORAGE_KEY}_security`, JSON.stringify(cleanData));
  }, [securityData]);

  // Validation par étape avec intégrité
  const validatePersonalStep = (): StepValidation => {
    const integrityCheck = validateStepIntegrity('personal', personalData);
    if (!integrityCheck.isValid) {
      return {
        isValid: false,
        errors: {
          integrity: integrityCheck.errors.join(', ')
        }
      };
    }

    const cleanData = preventDataContamination(personalData);
    backupStepData('personal', cleanData);

    const errors: Record<string, string> = {};
    
    if (!personalData.firstName.trim()) {
      errors.firstName = 'Le prénom est requis';
    }
    if (!personalData.lastName.trim()) {
      errors.lastName = 'Le nom est requis';
    }
    if (!personalData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      errors.email = 'L\'email n\'est pas valide';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateProfessionalStep = (): StepValidation => {
    const integrityCheck = validateStepIntegrity('professional', professionalData);
    if (!integrityCheck.isValid) {
      return {
        isValid: false,
        errors: {
          integrity: integrityCheck.errors.join(', ')
        }
      };
    }

    const cleanData = preventDataContamination(professionalData);
    backupStepData('professional', cleanData);

    const errors: Record<string, string> = {};
    
    if (!professionalData.address.trim()) {
      errors.address = 'L\'adresse est requise';
    }
    if (!professionalData.zipCode.trim()) {
      errors.zipCode = 'Le code postal est requis';
    }
    if (!professionalData.city.trim()) {
      errors.city = 'La ville est requise';
    }
    if (!professionalData.country) {
      errors.country = 'Le pays est requis';
    }
    if (!professionalData.companyName.trim()) {
      errors.companyName = 'Le nom de l\'entreprise est requis';
    }
    
    if (professionalData.phoneNumber && professionalData.country) {
      try {
        if (!isValidPhoneNumber(professionalData.phoneNumber, professionalData.country as CountryCode)) {
          errors.phoneNumber = 'Le numéro de téléphone n\'est pas valide';
        }
      } catch (error) {
        errors.phoneNumber = 'Format de numéro invalide';
      }
    }
    
    if (professionalData.businessPhone && professionalData.country) {
      try {
        if (!isValidPhoneNumber(professionalData.businessPhone, professionalData.country as CountryCode)) {
          errors.businessPhone = 'Le numéro de téléphone professionnel n\'est pas valide';
        }
      } catch (error) {
        errors.businessPhone = 'Format de numéro invalide';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSecurityStep = (): StepValidation => {
    const integrityCheck = validateStepIntegrity('security', securityData);
    if (!integrityCheck.isValid) {
      return {
        isValid: false,
        errors: {
          integrity: integrityCheck.errors.join(', ')
        }
      };
    }

    const cleanData = preventDataContamination(securityData);
    backupStepData('security', cleanData);

    const errors: Record<string, string> = {};
    
    if (!securityData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (securityData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!securityData.confirmPassword) {
      errors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (securityData.password !== securityData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!securityData.terms) {
      errors.terms = 'Vous devez accepter les conditions';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const clearStep = (step: 'personal' | 'professional' | 'security') => {
    switch (step) {
      case 'personal':
        setPersonalData({ firstName: '', lastName: '', email: '' });
        localStorage.removeItem(`${STORAGE_KEY}_personal`);
        break;
      case 'professional':
        setProfessionalData({
          address: '',
          zipCode: '',
          city: '',
          country: '',
          companyName: '',
          phoneNumber: '',
          businessPhone: ''
        });
        localStorage.removeItem(`${STORAGE_KEY}_professional`);
        break;
      case 'security':
        setSecurityData({ password: '', confirmPassword: '', terms: false });
        localStorage.removeItem(`${STORAGE_KEY}_security`);
        break;
    }
  };

  const handleStepError = (step: 'personal' | 'professional' | 'security') => {
    const previousData = rollbackStep(step);
    if (previousData) {
      switch (step) {
        case 'personal':
          setPersonalData(previousData as PersonalData);
          break;
        case 'professional':
          setProfessionalData(previousData as ProfessionalData);
          break;
        case 'security':
          setSecurityData(previousData as SecurityData);
          break;
      }
    }
  };

  return {
    personalData,
    setPersonalData,
    professionalData,
    setProfessionalData,
    securityData,
    setSecurityData,
    validatePersonalStep,
    validateProfessionalStep,
    validateSecurityStep,
    clearStep,
    handleStepError
  };
};