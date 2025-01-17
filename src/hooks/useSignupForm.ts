import { useState, useEffect } from 'react';
import { PersonalData, ProfessionalData, SecurityData } from '@/types/signup';

const STORAGE_KEY = 'signup_form_data';

export const useSignupForm = () => {
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

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_personal`, JSON.stringify(personalData));
  }, [personalData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_professional`, JSON.stringify(professionalData));
  }, [professionalData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_security`, JSON.stringify(securityData));
  }, [securityData]);

  const validatePersonalStep = () => {
    const errors: Record<string, string> = {};
    
    if (!personalData.email.trim()) {
      errors.email = 'L\'email est requis';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateProfessionalStep = () => {
    const errors: Record<string, string> = {};
    
    if (!professionalData.address?.trim()) {
      errors.address = 'L\'adresse est requise';
    }
    
    if (!professionalData.city?.trim()) {
      errors.city = 'La ville est requise';
    }
    
    if (!professionalData.country?.trim()) {
      errors.country = 'Le pays est requis';
    }

    // Vérifier qu'au moins un numéro de téléphone est rempli
    if (!professionalData.phoneNumber?.trim() && !professionalData.businessPhone?.trim()) {
      errors.phoneNumber = 'Au moins un numéro de téléphone est requis';
      errors.businessPhone = 'Au moins un numéro de téléphone est requis';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSecurityStep = () => {
    const errors: Record<string, string> = {};
    
    if (!securityData.password) {
      errors.password = 'Le mot de passe est requis';
    }
    
    if (securityData.password !== securityData.confirmPassword) {
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