import { RegisterPayload } from '../types/RegisterPayload';
import { apiGet, apiPost, httpClient } from "@buddybets-commons-lib/http";
import { AxiosResponse } from "axios";
import { StatusCodes } from 'http-status-codes';

interface SignupInitResponse {
  jwt_nonce: string;
  captcha_token: string;
  jwt_csrf: string;
}

export class UserService {

    static async getSignupInit(): Promise<SignupInitResponse> {
        try {
            const response = await apiGet<SignupInitResponse>(
                "http://localhost:8000/gateway_iam/api/signup/init",
            );
            const initData = response.data ?? response; // fallback si .data es undefined
            return initData;
        } catch (err: any) {
            console.error("Error detallado:", err.response?.status, err.response?.data);
            throw new Error("Error en el registro usuario");
        }
    }
    
    static async postRegisterSignupSubmit(data: RegisterPayload): Promise<void> {
        const response: AxiosResponse<SignupInitResponse> = await apiPost<SignupInitResponse>(
            "http://localhost:8000/gateway_iam/api/signup/submit", 
            data
        );

        if (response.status !== StatusCodes.OK) {
        throw new Error("Error en el registro usuario");
        }
        window.location.href = "/login";
    }
}