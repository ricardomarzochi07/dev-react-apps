"use strict";
// core/safeRequest.ts
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
exports.safeRequest = safeRequest;
const handleApiResponse_1 = require("../utils/handleApiResponse");
function safeRequest(call) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield call();
            console.log("🧾 Raw response from backend:", response);
            return (0, handleApiResponse_1.handleApiResponse)(response);
        }
        catch (error) {
            //  Axios lanza error para status >= 400, pero a veces con body útil
            if (error.response) {
                const apiError = error.response.data;
                console.log("⚠️ Capturado en catch con body útil:", apiError);
                return (0, handleApiResponse_1.handleApiResponse)(apiError); // ✅ lo pasamos igual
            }
            // 🧨 Error real de red o inesperado
            return {
                success: false,
                data: {},
                message: error.message || "Network error",
                code: 500,
            };
        }
    });
}
