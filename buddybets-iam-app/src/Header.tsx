import React from 'react'

const apiUrl = process.env.REACT_APP_API_URL;
const env = process.env.REACT_APP_ENV;
console.log('API URL:', apiUrl);

const Header = () => {
    return (
    <div>       
        <h1>Configuración de entorno</h1>
        <p>API URL: {apiUrl}</p>
        <p>Entorno: {env}</p>
     </div> 
     ); 
}
export default Header



/*
import React from "react";

const Header = () => <h1> Microfrontend: Remote</h1>;

export default Header;
*/