import { HttpResponseSchema } from '../schemas/HttpResponseSchema';
import { ValidatedResponse } from '../utils/handleApiResponse';
/**
 * Hook React para manejar peticiones API con loading y error.
 */
export declare function useApi<T>(): {
    request: (apiCall: () => Promise<HttpResponseSchema<T>>) => Promise<ValidatedResponse<T>>;
    loading: boolean;
    error: string | null;
};
