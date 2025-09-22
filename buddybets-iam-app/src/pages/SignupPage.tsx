import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { RegisterPayload } from "../types/RegisterPayload";
import styles from "./SignupPage.module.css";
import stadium from "../assets/images/chat_estadio1.png";
import fan from "../assets/images/cavas_torcedor03.png";
import { UserService } from "../services/userService";
import ReCAPTCHA from "react-google-recaptcha";
import { validatePassword } from "../utils/validatePassword";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateEmail } from "../utils/validateEmail";
import { validateName } from "../utils/validateName";
import { validateUsername } from "../utils/validateUsername";
import { useNavigate } from 'react-router-dom';

const initialFormState: RegisterPayload = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  username: '',
  password: '',
  captcha_token: '',
  jwt_nonce: '',
  jwt_csrf: '',
};

interface SignupInitResponse {
  jwt_nonce: string;
  captcha_token: string;
  jwt_csrf: string;
}

export default function SignupPage() {
  const [form, setForm] = useState(initialFormState);
  const [signupInit, setSignupInit] = useState<SignupInitResponse | null>(null);
  const [loadingInit, setLoadingInit] = useState(true);
  const [errorInit, setErrorInit] = useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [namesError, setNamesError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);


  /** Inicializar signup */
  useEffect(() => {
    const fetchSignupInit = async () => {
      try {
        const initData = await UserService.getSignupInit();
        if (!initData) {
          throw new Error("Respuesta vacía del servidor");
        }

        console.log("Init data:", initData);

        setSignupInit(initData);
        // Guardamos el nonce en el form
        setForm(f => ({
        ...f,
        jwt_nonce: initData.jwt_nonce ?? '', // <- default seguro
        jwt_csrf: initData.jwt_csrf ?? '',
      }));
      } catch (err: any) {
        console.error("Error inicializando signup: ", err);
        setErrorInit(err.message || "No se pudo inicializar el registro");
      } finally {
        setLoadingInit(false);
      }
    };
    fetchSignupInit();
  }, []);

  /** Manejo de cambio genérico */
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setForm(prevForm => ({
    ...prevForm,
    [name]: value,
  }));
};

const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const emailValue = e.target.value;
  const usernameValue = emailValue.split('@')[0].trim();
  setForm(prevForm => ({
    ...prevForm,
    email: emailValue,
    username: usernameValue,
  }));
};

  

const [loadingSubmit, setLoadingSubmit] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const navigate = useNavigate();

  // Validación de campos obligatorios > 3 caracters
  const requiredError = validateName(form);
  if (requiredError.error && requiredError.messages) {
    const allErrors = Object.values(requiredError.messages).join('\n');
    setNamesError(allErrors);
    return;
  }else {
    setNamesError(null); 
  }

    // Validación de campos Username > 3 caracters
  const usernameError = validateUsername(form);
  console.log("USERNAME", form.username)
  if (usernameError.error && usernameError.messages) {
    const allErrors = Object.values(usernameError.messages).join('\n');
    setUsernameError(allErrors);
    return;
  }else {
    setUsernameError(null); 
  }

  if (!validateEmail(form.email)) {
    setEmailError("Email invalid format");
    return; // Detenemos el submit si email inválido
  } else {
    setEmailError(null); // Limpiamos error si email válido
  }

  if (!form.gender) {
    setGenderError('Please select a gender');
    return;
  } else{
      setGenderError(null);
  }

  const validation = validatePassword(form.password, passwordConfirm);
  if (!validation.valid) {
    setPasswordError(validation.message);
    return;
  } else {
    setPasswordError(null); // Limpiar error cuando la validación pase
  }
  
  if (!signupInit || !form.captcha_token) 
      setCaptchaError("Debe completar el captcha");

  try {
    setLoadingSubmit(true);
    const result = await UserService.postRegisterSignupSubmit(form);
    if (!result.status_response || result.status_code !== 200) {
      setRegisterError(result.message);
      setLoadingSubmit(false);
      return;
    }
     // Redirección SPA sin recargar la página
    navigate('/login');
  } catch (err: any) {
    alert(err.message || "Error al registrar el usuario");
  } finally {
    setLoadingSubmit(false);
  }
};

  // Mientras carga init, mostramos loading
if (loadingInit) {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p>Load Page ...</p>
    </div>
  );
}
// Si hubo error → mensaje de error
if (errorInit) {
  return (
    <div className={styles.errorWrapper}>
      <h2>❌ Error initializing the page</h2>
      <p>{errorInit}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${stadium})` }}>
      <div className={styles.inner}>
        <div className={styles.imageHolder}>
          <img src={fan} alt="Fan" />
        </div>
        
        {registerError && <div className={styles.errorMessage}>{registerError}</div>}

        <form onSubmit={handleSubmit}>
          <h3>User Registration</h3>

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.formControl}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className={styles.formControl}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
            <div>
              {namesError && <div className={styles.errorMessage}>{namesError}</div>}
            </div>
          <div className={styles.formWrapper}>
            <input
              type="text"
              placeholder="Email Address"
              className={styles.formControl}
              name="email"
              value={form.email}
              onChange={handleEmailChange}
            />
            <i className="zmdi zmdi-email"></i>
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}
          </div>
          <div className={styles.formWrapper}>
            <input
              type="text"
              placeholder="Username"
              className={styles.formControl}
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-account"></i>
            {usernameError && <div className={styles.errorMessage}>{usernameError}</div>}
          </div>


          <div className={styles.formWrapper}>
            <select
              name="gender"
              className={styles.formControl}
              value={form.gender}
              onChange={handleChange}
            >
              <option value="" disabled>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }}></i>
            {genderError && <div className={styles.errorMessage}>{genderError}</div>}
          </div>

          <div className={styles.formWrapper}>
            <input
              type="password"
              placeholder="Password"
              className={styles.formControl}
              name="password"
              value={form.password}
               onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <i className="zmdi zmdi-lock"></i>
          </div>

          <div className={styles.formWrapper}>
               <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={styles.formControl}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.showPasswordButton}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
          </div>

          
          {/* ReCaptcha */}
          {signupInit && (
            <div className={styles.recaptchaWrapper}>
              <ReCAPTCHA
                sitekey={signupInit.captcha_token}
                onChange={(token) => setForm(f => ({ ...f, captcha_token: token ?? '' }))}
              />
              {captchaError && <div className={styles.errorMessage}>{captchaError}</div>}
            </div>
          )}

          <button
            type="submit"
            disabled={loadingSubmit}
            className={styles.submitButton}
          >
            {loadingSubmit ? (
              <>
                <i className="zmdi zmdi-spinner zmdi-hc-spin"></i> Registrando...
              </>
            ) : (
              <>
                Register <i className="zmdi zmdi-arrow-right"></i>
              </>
            )}
          </button>
        </form>
      </div>
      {loadingSubmit && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
          <p>Registrando usuario...</p>
        </div>
      )}     
    </div>
  );
}
