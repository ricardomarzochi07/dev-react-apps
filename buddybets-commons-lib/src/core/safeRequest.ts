// core/safeRequest.ts

import { HttpResponseSchema } from "../schemas/HttpResponseSchema";
import { handleApiResponse } from "../utils/handleApiResponse";
import { ValidatedResponse } from "../utils/handleApiResponse";

export async function safeRequest<T>(
  call: () => Promise<HttpResponseSchema<T>>
): Promise<ValidatedResponse<T>> {
  try {
    const response = await call();
    console.log("🧾 Raw response from backend:", response);
    return handleApiResponse<T>(response);
  } catch (error: any) {
    //  Axios lanza error para status >= 400, pero a veces con body útil
    if (error.response) {
      const apiError: HttpResponseSchema<T> = error.response.data;
      console.log("⚠️ Capturado en catch con body útil:", apiError);
      return handleApiResponse<T>(apiError); // ✅ lo pasamos igual
    }

    // 🧨 Error real de red o inesperado
    return {
      success: false,
      data: {} as T,
      message: error.message || "Network error",
      code: 500,
    };
  }
}

