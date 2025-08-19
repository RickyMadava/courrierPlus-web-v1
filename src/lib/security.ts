import DOMPurify from 'isomorphic-dompurify';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

export const validateInput = (input: string, maxLength: number = 255): boolean => {
  if (!input || input.length === 0) return false;
  if (input.length > maxLength) return false;
  
  const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const sqlPattern = /('|(\\'))|(-|(%2D))|(;|(%3B))|(\||(%7C))/i;
  
  return !xssPattern.test(input) && !sqlPattern.test(input);
};

export const generateNonce = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};