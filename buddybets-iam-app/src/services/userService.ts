import { RegisterPayload } from '../types/RegisterPayload';
import { httpClient, safeRequest } from "@buddybets-commons-lib/http";
import { HttpResponseSchema } from "@buddybets-commons-lib/http";
import { API_PATHS } from './apiPaths';
import { ValidatedResponse } from "@buddybets-commons-lib/http"; // Asegúrate de exportarlo donde lo definas
import { AxiosResponse } from 'axios';

interface SignupInitResponse {
  jwt_nonce: string;
  captcha_token: string;
  jwt_csrf: string;
}



export class UserService {
  private static apiUrl_SIGNUP_SVC = process.env.REACT_APP_SIGNUP_GATEWAY_SERVICE_URL;

  /** GET /signup/init */
  static async getSignupInit(): Promise<ValidatedResponse<SignupInitResponse>> {
    return safeRequest<SignupInitResponse>(() =>
      httpClient
        .get<HttpResponseSchema<SignupInitResponse>>(
          `${this.apiUrl_SIGNUP_SVC}${API_PATHS.SIGNUP_INITIAL}`
        )
         .then((res: AxiosResponse<HttpResponseSchema<SignupInitResponse>>) => res.data)
    );
  }

  /** POST /signup/submit */
  static async postRegisterSignupSubmit(
    data: RegisterPayload
  ): Promise<ValidatedResponse<RegisterPayload>> {
    return safeRequest<RegisterPayload>(() =>
      httpClient
        .post<HttpResponseSchema<RegisterPayload>>(
          `${this.apiUrl_SIGNUP_SVC}${API_PATHS.SIGNUP_SUBMIT}`,
          data
        )
        .then((res: AxiosResponse<HttpResponseSchema<RegisterPayload>>) => res.data)
    );
  }
}


