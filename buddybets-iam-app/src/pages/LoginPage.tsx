import React from "react";
import { userAuth } from "../hooks/useAuth";
import styles from "./LoginPage.module.css";
//import * as styles from "./LoginPage.module.css";
//import * as styles from "./LoginPage.module.css";

console.log("NOW ", styles)
export default function Login(){

  const {user, login, logout} = userAuth();

  return(
    <div>
      <div className={styles.page}>
        
              <h1>Microfrontend Autenticación</h1>
    </div>
      {user ? (
            <>
              <p>Bienvenido, {user.profile.name}</p>
              <button onClick={logout}>Cerrar sesión</button>
            </>
          ) : (
            <button onClick={login}>Iniciar sesión</button>
      )}
    </div>
  );
}
