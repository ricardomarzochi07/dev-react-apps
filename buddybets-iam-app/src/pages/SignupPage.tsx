import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { RegisterPayload } from "../types/RegisterPayload";
import styles from "./SignupPage.module.css";
import stadium from "../assets/images/chat_estadio1.png";
import fan from "../assets/images/cavas_torcedor03.png";
import { UserService } from "../services/userService";
import ReCAPTCHA from "react-google-recaptcha";

const initialFormState: RegisterPayload & { captcha_token?: string; jwt_nonce?: string; jwt_csrf?: string } = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  username: '',
  password: '',
  captcha_token: undefined,
  jwt_nonce: undefined,
  jwt_csrf: undefined,
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

  /** Inicializar signup */
  useEffect(() => {
    const fetchSignupInit = async () => {
      try {
        const initData = await UserService.getSignupInit();
        if (!initData) return;
        console.log("Init data:", initData);

        setSignupInit(initData);
        // Guardamos el nonce en el form
        setForm(f => ({
        ...f,
        jwt_nonce: initData.jwt_nonce ?? '', // <- default seguro
        jwt_csrf: initData.jwt_csrf ?? '',
      }));
      } catch (err) {
        console.error("Error inicializando signup: ", err);
      } finally {
        setLoadingInit(false);
      }
    };
    fetchSignupInit();
  }, []);

  /** Manejo de cambio genérico */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /** Manejo de submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupInit || !form.captcha_token) {
      alert("Debe completar el captcha antes de continuar");
      return;
    }

    try {
      console.error("Error inicializando signup: ", form);

      await UserService.postRegisterSignupSubmit(form);
    } catch (err: any) {
      alert(err.message || "Error al registrar el usuario");
    }
  };

  // Mientras carga init, mostramos loading
  if (loadingInit) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${stadium})` }}>
      <div className={styles.inner}>
        <div className={styles.imageHolder}>
          <img src={fan} alt="Fan" />
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Registration Form</h3>

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
          </div>

          <div className={styles.formWrapper}>
            <input
              type="text"
              placeholder="Email Address"
              className={styles.formControl}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-email"></i>
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
          </div>

          <div className={styles.formWrapper}>
            <input
              type="password"
              placeholder="Password"
              className={styles.formControl}
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <i className="zmdi zmdi-lock"></i>
          </div>

          <div className={styles.formWrapper}>
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.formControl}
              name="passwordConfirm"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          {/* ReCaptcha */}
          {signupInit && (
            <ReCAPTCHA
              sitekey={signupInit.captcha_token}
              onChange={(token) => setForm(f => ({ ...f, captcha_token: token ?? undefined }))}
            />
          )}

          <button type="submit">
            Register
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
