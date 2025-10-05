import { HttpResponseSchema } from "../schemas/HttpResponseSchema";
import { ValidatedResponse } from "../utils/handleApiResponse";
export declare function safeRequest<T>(call: () => Promise<HttpResponseSchema<T>>): Promise<ValidatedResponse<T>>;
