import { useEffect } from "react";
import userManager from "../services/authService";

export function CallbackPage(){

    useEffect(() => {
        userManager.signinRedirectCallback().then(() => {
            window.location.href = '/';
        });
    },[]);

    return <div>Processando login...</div>

}