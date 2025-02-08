
export const en = {
  filters: {
    title: 'Filters',
    country: {
      label: 'Country of Origin',
      placeholder: 'Select country',
    },
    sort: {
      label: 'Sort By',
      placeholder: 'Choose sorting',
      newest: 'Newest First',
      oldest: 'Oldest First',
    },
    listingId: {
      label: 'Listing ID',
      placeholder: 'Enter listing ID',
    },
    keywords: {
      label: 'Keywords',
      placeholder: 'Search keywords',
    },
    category: {
      label: 'Category',
      placeholder: 'Select a category',
    },
    subcategory: {
      label: 'Subcategory',
      placeholder: 'Select a subcategory',
    },
    subsubcategory: {
      label: 'Sub-subcategory',
      placeholder: 'Select a sub-subcategory',
    },
    actions: {
      clearFilters: 'Clear Filters',
      search: 'Search'
    },
  },
  nav: {
    login: 'Login',
    logout: 'Logout',
    post: 'Post',
    search: 'Search...',
    language: {
      en: 'English',
      fr: 'French',
      es: 'Spanish',
    },
  },
  footer: {
    tagline: "Your trusted partner for export and international trade",
    quickLinks: {
      title: "Quick Links",
      listings: "Listings",
      directory: "Directory",
      tools: "Tools"
    },
    contact: {
      title: "Contact",
      contactUs: "Contact Us",
      legalNotice: "Legal Notice"
    },
    newsletter: {
      title: "Newsletter",
      placeholder: "Enter your email",
      subscribe: "Subscribe"
    },
    copyright: "All rights reserved"
  },
  login: {
    title: "Welcome back",
    subtitle: "We're glad to see you again",
    backHome: "Back to home",
    email: {
      label: "Email",
      placeholder: "Enter your email",
      invalid: "Invalid email address"
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      requirements: {
        minLength: "Password must be at least 6 characters long",
        uppercase: "Password must contain at least one uppercase letter",
        number: "Password must contain at least one number"
      },
      strength: "Password strength",
      forgot: "Forgot password?",
      show: "Show password",
      hide: "Hide password"
    },
    rememberMe: "Remember me",
    submit: "Sign in",
    loading: "Signing in...",
    success: "Welcome!",
    successMessage: "You have successfully logged in",
    error: "Login Failed",
    errorMessage: "Invalid email or password",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    legal: {
      terms: "Terms of Service",
      privacy: "Privacy Policy"
    }
  },
  signup: {
    title: "Create an account",
    subtitle: "Join our community",
    steps: {
      step1: "Personal Information",
      step2: "Contact Details",
      step3: "Security",
      progress: "Step {step} of {total}"
    },
    buttons: {
      next: "Next",
      previous: "Previous",
      submit: "Create Account",
      loading: "Creating account...",
      login: "Already have an account?",
      backHome: "Back to home"
    },
    labels: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      address: "Address",
      zipCode: "Zip code",
      city: "City",
      country: "Country",
      phoneNumber: "Personal phone",
      businessPhone: "Business phone",
      companyName: "Company name",
      tradeRegisterNumber: "Trade register number",
      terms: "I accept the terms of service and privacy policy"
    },
    placeholders: {
      firstName: "Enter your first name",
      lastName: "Enter your last name",
      email: "Enter your email",
      password: "Enter your password",
      confirmPassword: "Confirm your password",
      address: "Enter your address",
      zipCode: "Enter zip code",
      city: "Enter city",
      country: "Select your country",
      phoneNumber: "Enter phone number",
      businessPhone: "Enter business phone",
      companyName: "Enter company name",
      tradeRegisterNumber: "Enter trade register number",
      phoneCode: "Code"
    },
    validation: {
      required: "This field is required",
      firstName: "First name must be at least 2 characters long",
      lastName: "Last name must be at least 2 characters long",
      email: "Invalid email address",
      password: {
        length: "Password must be at least 8 characters long",
        minLength: "Password must be at least 8 characters long",
        uppercase: "Password must contain at least one uppercase letter",
        number: "Password must contain at least one number",
        strength: "Password strength:"
      },
      confirmPassword: "Passwords do not match",
      terms: "You must accept the terms and conditions",
      phoneNumber: {
        invalid: "Invalid phone number format",
        countryMismatch: "Invalid phone number for this country",
        required: "Phone number is required"
      },
      address: {
        required: "Address is required"
      },
      zipCode: {
        required: "Zip code is required"
      },
      city: {
        required: "City is required"
      },
      country: {
        required: "Country is required"
      },
      companyName: {
        required: "Company name is required",
        minLength: "Company name must be at least 2 characters"
      },
      businessPhone: {
        required: "Business phone is required",
        invalid: "Invalid phone number format",
        countryMismatch: "Invalid phone number for this country"
      },
      error: {
        title: "Validation Error",
        description: "Please fix the errors before continuing"
      }
    },
    messages: {
      success: {
        title: "Account Created",
        description: "Your account has been created successfully"
      },
      error: {
        title: "Error",
        description: "An error occurred while creating your account"
      }
    }
  },
  profile: {
    title: "Profile Settings",
    tabs: {
      general: "General",
      security: "Security",
      preferences: "Preferences",
      listings: {
        title: "My Anuncios",
        empty: "You have not yet published any ads",
        status: {
          active: "Active",
          pending: "Pending",
          expired: "Expired"
        },
        filters: {
          all: "All ads",
          active: "Active",
          pending: "Pending",
          expired: "Expired",
          search: "Search in your ads..."
        },
        sort: {
          newest: "Most recent",
          oldest: "Oldest",
          mostViewed: "Most viewed"
        },
        actions: {
          edit: "Edit",
          delete: "Delete",
          deactivate: "Deactivate",
          activate: "Activate"
        }
      }
    },
    general: {
      title: "Company Profile",
      sections: {
        personal: "Contact Person Information",
        business: "Business Information",
        address: "Company Address"
      }
    },
    security: {
      title: "Security Settings",
      comingSoon: "Security settings coming soon"
    },
    preferences: {
      title: "Preferences",
      comingSoon: "Preference settings coming soon"
    }
  }
};
