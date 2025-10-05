"use strict";
// utils/handleApiResponse.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApiResponse = handleApiResponse;
/**
 * Procesa una respuesta estándar del backend basada en HttpResponseSchema.
 */
function handleApiResponse(response) {
    const { status_code, status_response, data, message } = response;
    if (status_code >= 200 && status_code < 300 && status_response) {
        return {
            success: true,
            data: data, // ✅ Forzar data si status ok (seguro aquí)
            message: message,
            code: status_code,
        };
    }
    let errorMessage = message || 'Unexpected error';
    if (status_code >= 400 && status_code < 505) {
        console.log("400 MESAGEM ", `${message}`);
        errorMessage = `${message}`;
    }
    else if (status_code >= 500) {
        errorMessage = `Server error: ${message || 'Please try again later.'}`;
    }
    return {
        success: false,
        data: {}, // ✅ Siempre retornar `data`, aunque vacío
        message,
        code: status_code,
    };
}
