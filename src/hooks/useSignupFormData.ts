import { useState, useEffect } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';
import { phoneCodes } from '@/data/phoneCodes';
import type { CountryCode } from 'libphonenumber-js';

interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

const STORAGE_KEY = 'signup_form_data';

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

  // Sauvegarde automatique des données
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_personal`, JSON.stringify(personalData));
  }, [personalData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_professional`, JSON.stringify(professionalData));
  }, [professionalData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_security`, JSON.stringify(securityData));
  }, [securityData]);

  const validatePersonalStep = (): StepValidation => {
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
    const errors: Record<string, string> = {};
    
    // Validation simplifiée - vérifie uniquement si les champs sont vides
    if (!professionalData.address) {
      errors.address = 'L\'adresse est requise';
    }
    if (!professionalData.zipCode) {
      errors.zipCode = 'Le code postal est requis';
    }
    if (!professionalData.city) {
      errors.city = 'La ville est requise';
    }
    if (!professionalData.country) {
      errors.country = 'Le pays est requis';
    }
    if (!professionalData.companyName) {
      errors.companyName = 'Le nom de l\'entreprise est requis';
    }
    if (!professionalData.phoneNumber) {
      errors.phoneNumber = 'Le numéro de téléphone est requis';
    }
    if (!professionalData.businessPhone) {
      errors.businessPhone = 'Le numéro professionnel est requis';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSecurityStep = (): StepValidation => {
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
    clearStep
  };
};
