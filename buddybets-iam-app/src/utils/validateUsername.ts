import { RegisterPayload } from "../types/RegisterPayload";

/**
 * Función para validar los campos obligatorios del formulario
 * @param form El estado del formulario con los datos ingresados
 * @returns Mensaje de error si algún campo está vacío o null si todos los campos son válidos
 */
export const validateUsername = (form: RegisterPayload) => {
  const errors: { username?: string } = {};

  const rawUsername = form.username;
  const username = rawUsername?.trim();

  if (!username || username.length < 3 || username.length > 20) {
    errors.username = 'Username must be 3–10 characters long';
  } 
  if (Object.keys(errors).length > 0) {
    return { error: true, messages: errors };
  }
  return { error: false };
};