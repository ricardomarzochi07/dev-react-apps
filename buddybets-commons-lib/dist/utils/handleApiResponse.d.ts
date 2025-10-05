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
export declare function handleApiResponse<T>(response: HttpResponseSchema<T>): ValidatedResponse<T>;
