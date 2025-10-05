"use strict";
// hooks/useApi.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = useApi;
const react_1 = require("react");
const handleApiResponse_1 = require("../utils/handleApiResponse");
/**
 * Hook React para manejar peticiones API con loading y error.
 */
function useApi() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const request = (apiCall) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        try {
            const raw = yield apiCall();
            const validated = (0, handleApiResponse_1.handleApiResponse)(raw);
            if (!validated.success) {
                setError(validated.message || 'Unknown error');
            }
            return validated;
        }
        catch (err) {
            setError(err.message || 'Request failed');
            return {
                success: false,
                data: {}, // ✅ Consistencia con el resto
                message: err.message || "Network error",
                code: 500,
            };
        }
        finally {
            setLoading(false);
        }
    });
    return { request, loading, error };
}
