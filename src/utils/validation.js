// Validation utility functions for forms

export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  // Check if email ends with @gmail.com or @yahoo.com
  const validDomains = ['@gmail.com', '@yahoo.com'];
  const hasValidDomain = validDomains.some(domain => email.toLowerCase().endsWith(domain));
  
  if (!hasValidDomain) {
    return 'Email must be from @gmail.com or @yahoo.com';
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email format';
  }
  
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return '';
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return `${fieldName} is required`;
  }
  
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  
  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  
  // Check if name contains only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  
  return '';
};

export const validateFirstName = (firstName) => {
  return validateName(firstName, 'First name');
};

export const validateLastName = (lastName) => {
  return validateName(lastName, 'Last name');
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  
  return '';
};

// Additional validation functions for other forms

export const validateNumber = (value, fieldName, min = 0, max = Infinity) => {
  if (!value && value !== 0) {
    return `${fieldName} is required`;
  }
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  
  if (num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (num > max) {
    return `${fieldName} must be less than or equal to ${max}`;
  }
  
  return '';
};

export const validatePhoneNumber = (phone) => {
  if (!phone) {
    return 'Phone number is required';
  }
  
  // Basic phone number validation - adjust regex based on your requirements
  const phoneRegex = /^[+]?[\d\s\-()]+$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  
  if (phone.replace(/[^\d]/g, '').length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  
  return '';
};

export const validateYear = (year) => {
  if (!year) {
    return 'Year is required';
  }
  
  const yearNum = parseInt(year);
  
  if (isNaN(yearNum)) {
    return 'Year must be a valid number';
  }
  
  const currentYear = new Date().getFullYear();
  if (yearNum < 1800 || yearNum > currentYear) {
    return `Year must be between 1800 and ${currentYear}`;
  }
  
  return '';
};

export const validateRegistrationNumber = (registrationNumber) => {
  if (!registrationNumber) {
    return 'Registration number is required';
  }
  
  if (registrationNumber.trim().length < 3) {
    return 'Registration number must be at least 3 characters long';
  }
  
  if (registrationNumber.trim().length > 50) {
    return 'Registration number must be less than 50 characters';
  }
  
  return '';
};

export const validateBusinessDescription = (description) => {
  if (!description) {
    return 'Business description is required';
  }
  
  if (description.trim().length < 10) {
    return 'Business description must be at least 10 characters long';
  }
  
  if (description.trim().length > 500) {
    return 'Business description must be less than 500 characters';
  }
  
  return '';
};

// Validation for data entry forms
export const validateDataEntryForm = (formData) => {
  const errors = {};
  
  errors.electricity = validateNumber(formData.electricity, 'Electricity usage', 0, 10000);
  errors.fuel = validateNumber(formData.fuel, 'Fuel consumption', 0, 10000);
  errors.waste = validateNumber(formData.waste, 'Waste production', 0, 10000);
  
  // Filter out empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation for company profile forms
export const validateCompanyProfileForm = (formData) => {
  const errors = {};
  
  errors.businessName = validateRequired(formData.businessName, 'Business name');
  errors.location = validateRequired(formData.location, 'Location');
  errors.numberOfEmployees = validateNumber(formData.numberOfEmployees, 'Number of employees', 1, 100000);
  errors.registrationNumber = validateRegistrationNumber(formData.registrationNumber);
  errors.contactEmail = validateEmail(formData.contactEmail);
  errors.contactPhone = validatePhoneNumber(formData.contactPhone);
  errors.businessDescription = validateBusinessDescription(formData.businessDescription);
  errors.yearEstablished = validateYear(formData.yearEstablished);
  
  // Filter out empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Comprehensive form validation for registration
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  errors.firstName = validateFirstName(formData.firstName);
  errors.lastName = validateLastName(formData.lastName);
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  
  // Filter out empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Comprehensive form validation for login
export const validateLoginForm = (formData) => {
  const errors = {};
  
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  
  // Filter out empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
