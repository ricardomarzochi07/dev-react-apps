// utils/handleApiResponse.ts

import { HttpResponseSchema } from '../schemas/HttpResponseSchema';

export interface ValidatedResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code: number;
}

/**
 * Procesa una respuesta estándar del backend basada en HttpResponseSchema.
 */
export function handleApiResponse<T>(
  response: HttpResponseSchema<T>
): ValidatedResponse<T> {
  const { status_code, status_response, data, message } = response;

  if (status_code >= 200 && status_code < 300 && status_response) {
    return {
      success: true,
      data: data as T,  // ✅ Forzar data si status ok (seguro aquí)
      message: message,
      code: status_code,
    };
  }

  let errorMessage = message || 'Unexpected error';

  if (status_code >= 400 && status_code < 505) {
    errorMessage = `${message}`;
  } 
  return {
    success: false,
    data: {} as T, // ✅ Siempre retornar `data`, aunque vacío
    message,
    code: status_code,
  };
}