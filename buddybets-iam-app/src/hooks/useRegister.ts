import { RegisterPayload } from '../types/RegisterPayload';
import { useState } from 'react';
import { UserService } from '../services/userService';


export function useRegister(){

    const [loading, setLoading] = useState(false);
    const [error, setError ] = useState<string | null>(null);

    const register = async (payload: RegisterPayload) => {
        try{
            setLoading(true);
            setError(null);
            /*await UserService.registerUser(payload);*/
        } catch (err){
            setError((err as Error).message);
        } finally{
            setLoading(false);
        }
    };
    return {register, loading, error};
}