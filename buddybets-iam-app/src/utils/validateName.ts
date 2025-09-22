import { RegisterPayload } from "../types/RegisterPayload";

/**
 * Función para validar los campos obligatorios del formulario
 * @param form El estado del formulario con los datos ingresados
 * @returns Mensaje de error si algún campo está vacío o null si todos los campos son válidos
 */
export const validateName = (form: RegisterPayload) => {
  const errors: { firstName?: string; lastName?: string } = {};

  if (!form.firstName || form.firstName.trim().length < 3 || 
      !form.lastName || form.lastName.trim().length < 3){
        errors.firstName = 'The name must have at least 3 characters';
  }

  if (Object.keys(errors).length > 0) {
    return { error: true, messages: errors };
  }

  return { error: false };
};