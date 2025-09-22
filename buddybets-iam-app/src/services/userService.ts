import { RegisterPayload } from '../types/RegisterPayload';
import { apiGet, apiPost, httpClient } from "@buddybets-commons-lib/http";
import { AxiosResponse } from "axios";
import { StatusCodes } from 'http-status-codes';
import { API_PATHS } from './apiPaths';

interface SignupInitResponse {
    jwt_nonce: string;
    captcha_token: string;
    jwt_csrf: string;
}

interface SignupSubmitResponse {
    status_response: boolean;
    status_code: number;
    data: string;
    message: string;
}

export class UserService {

    private static apiUrl_SIGNUP_SVC = process.env.REACT_APP_SIGNUP_GATEWAY_SERVICE_URL;

    static async getSignupInit(): Promise<SignupInitResponse> {
        try {
            const response = await apiGet<SignupInitResponse>(
                `${this.apiUrl_SIGNUP_SVC}${API_PATHS.SIGNUP_INITIAL}`,
            );
            const initData = response.data ?? response; // fallback si .data es undefined
            return initData;
        } catch (err: any) {
            console.error("Error detail:", err.response?.status, err.response?.data);
            throw new Error("Error user initial");
        }
    }
    
    static async postRegisterSignupSubmit(data: RegisterPayload): Promise<SignupSubmitResponse> {
        try {
            const response: AxiosResponse<SignupSubmitResponse> = await apiPost<SignupSubmitResponse>(
            `${this.apiUrl_SIGNUP_SVC}${API_PATHS.SIGNUP_SUBMIT}`,
            data
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                return error.response.data as SignupSubmitResponse;
            }
            return {
                status_response: false,
                status_code: 500,
                data: 'Error Not Controler',
                message: 'Error inesperado al registrar el usuario',
            };
        }
    }
}