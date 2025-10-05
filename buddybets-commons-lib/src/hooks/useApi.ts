// hooks/useApi.ts

import { useState } from 'react';
import { HttpResponseSchema } from '../schemas/HttpResponseSchema';
import { handleApiResponse, ValidatedResponse } from '../utils/handleApiResponse';

/**
 * Hook React para manejar peticiones API con loading y error.
 */
export function useApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (
    apiCall: () => Promise<HttpResponseSchema<T>>
  ): Promise<ValidatedResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const raw = await apiCall();
      const validated = handleApiResponse<T>(raw);
      if (!validated.success) {
        setError(validated.message || 'Unknown error');
      }
      return validated;
    } catch (err: any) {
      setError(err.message || 'Request failed');
      return {
        success: false,
        data: {} as T,  // ✅ Consistencia con el resto
        message: err.message || "Network error",
        code: 500,
          
      };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
