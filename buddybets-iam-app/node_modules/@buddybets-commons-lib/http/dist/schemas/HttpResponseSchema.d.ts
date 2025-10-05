export interface HttpResponseSchema<T> {
    status_response: boolean;
    status_code: number;
    data?: T;
    message?: string;
}
