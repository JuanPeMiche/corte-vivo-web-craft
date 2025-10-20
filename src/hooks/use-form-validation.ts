import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});

  // Sanitizar entrada de texto
  const sanitizeInput = useCallback((input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<[^>]*>?/gm, '') // Remove HTML tags
      .slice(0, 1000); // Limitar longitud
  }, []);

  // Validar email
  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Validar teléfono uruguayo
  const isValidUruguayanPhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^(\+598|598)?\s?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }, []);

  // Validar un campo individual
  const validateField = useCallback((
    fieldName: string, 
    value: string
  ): string | null => {
    const rule = rules[fieldName];
    if (!rule) return null;

    const sanitizedValue = sanitizeInput(value);

    // Requerido
    if (rule.required && !sanitizedValue) {
      return rule.message || `${fieldName} es requerido`;
    }

    if (!sanitizedValue) return null; // Si no es requerido y está vacío, no validar más

    // Longitud mínima
    if (rule.minLength && sanitizedValue.length < rule.minLength) {
      return rule.message || `${fieldName} debe tener al menos ${rule.minLength} caracteres`;
    }

    // Longitud máxima
    if (rule.maxLength && sanitizedValue.length > rule.maxLength) {
      return rule.message || `${fieldName} no puede exceder ${rule.maxLength} caracteres`;
    }

    // Patrón regex
    if (rule.pattern && !rule.pattern.test(sanitizedValue)) {
      return rule.message || `${fieldName} tiene un formato inválido`;
    }

    // Validación personalizada
    if (rule.custom && !rule.custom(sanitizedValue)) {
      return rule.message || `${fieldName} es inválido`;
    }

    return null;
  }, [rules, sanitizeInput]);

  // Validar todo el formulario
  const validateForm = useCallback((formData: { [key: string]: string }): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const value = formData[fieldName] || '';
      const error = validateField(fieldName, value);
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  // Limpiar errores
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Limpiar error de un campo específico
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    clearFieldError,
    sanitizeInput,
    isValidEmail,
    isValidUruguayanPhone,
  };
};