export interface PasswordValidationResult {
  valid: boolean;
  message: string;
}


export function validatePassword(password: string, passwordConfirm: string): PasswordValidationResult {
  if (password !== passwordConfirm) {
    return { valid: false, message: "Las contraseñas no coinciden" };
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regex.test(password)) {
    return {
      valid: false,
      message: "Password: min 8 chars, upper, lower, number and special character"
    };
  }

  return { valid: true, message: "Valid password" };
}