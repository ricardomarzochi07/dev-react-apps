import { useEffect, useState } from "react"; 
import userManager from "../services/authService";
import type { User } from 'oidc-client-ts'; 

export function userAuth(){
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        userManager.getUser().then(setUser).catch(() => setUser(null));
    },[]);

    const login = () => userManager.signinRedirect();
    const logout = () => userManager.signoutRedirect();

    return {user, login, logout};

}