// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  // Expresión regular básica para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};