import { useState, useEffect } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';
import { isValidPhoneNumber } from 'libphonenumber-js';
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

  // Sauvegarde automatique des données avec persistance
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
      errors.firstName = 'Veuillez entrer votre prénom';
    } else if (personalData.firstName.length < 2) {
      errors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!personalData.lastName.trim()) {
      errors.lastName = 'Veuillez entrer votre nom';
    } else if (personalData.lastName.length < 2) {
      errors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!personalData.email.trim()) {
      errors.email = 'Veuillez entrer votre adresse email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      errors.email = 'Veuillez entrer une adresse email valide (exemple: nom@domaine.com)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateProfessionalStep = (): StepValidation => {
    const errors: Record<string, string> = {};
    
    if (!professionalData.address.trim()) {
      errors.address = 'Veuillez entrer votre adresse';
    }

    if (!professionalData.zipCode.trim()) {
      errors.zipCode = 'Veuillez entrer votre code postal';
    }

    if (!professionalData.city.trim()) {
      errors.city = 'Veuillez entrer votre ville';
    }

    if (!professionalData.country) {
      errors.country = 'Veuillez sélectionner votre pays';
    }

    if (!professionalData.companyName.trim()) {
      errors.companyName = 'Veuillez entrer le nom de votre entreprise';
    }
    
    if (professionalData.phoneNumber) {
      if (professionalData.country && !isValidPhoneNumber(professionalData.phoneNumber, professionalData.country as CountryCode)) {
        errors.phoneNumber = 'Veuillez entrer un numéro de téléphone valide pour le pays sélectionné';
      }
    }
    
    if (professionalData.businessPhone) {
      if (professionalData.country && !isValidPhoneNumber(professionalData.businessPhone, professionalData.country as CountryCode)) {
        errors.businessPhone = 'Veuillez entrer un numéro de téléphone professionnel valide pour le pays sélectionné';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSecurityStep = (): StepValidation => {
    const errors: Record<string, string> = {};
    
    if (!securityData.password) {
      errors.password = 'Veuillez entrer un mot de passe';
    } else {
      if (securityData.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      }
      if (!/[A-Z]/.test(securityData.password)) {
        errors.password = 'Le mot de passe doit contenir au moins une majuscule';
      }
      if (!/[0-9]/.test(securityData.password)) {
        errors.password = 'Le mot de passe doit contenir au moins un chiffre';
      }
    }
    
    if (!securityData.confirmPassword) {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (securityData.password !== securityData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!securityData.terms) {
      errors.terms = 'Vous devez accepter les conditions d\'utilisation pour continuer';
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