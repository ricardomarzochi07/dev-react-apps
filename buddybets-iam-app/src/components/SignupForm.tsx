import styles from "../pages/SignupPage.module.css"; // Reutiliza tu CSS existente

type Props = {
  form: any;
  errors: Record<string, string | null>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleEmailChange: (e: React.ChangeEvent<any>) => void;
  passwordConfirm: string;
  setPasswordConfirm: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
};

export default function SignupForm({
  form,
  errors,
  handleChange,
  handleEmailChange,
  passwordConfirm,
  setPasswordConfirm,
  showPassword,
  setShowPassword,
}: Props) {
  return (
    <>
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
      {errors.namesError && <div className={styles.errorMessage}>{errors.namesError}</div>}

      <div className={styles.formWrapper}>
        <input
          type="text"
          placeholder="Email Address"
          className={styles.formControl}
          name="email"
          value={form.email}
          onChange={handleEmailChange}
        />
        {errors.emailError && <div className={styles.errorMessage}>{errors.emailError}</div>}
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
        {errors.usernameError && <div className={styles.errorMessage}>{errors.usernameError}</div>}
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
        {errors.genderError && <div className={styles.errorMessage}>{errors.genderError}</div>}
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
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
        {errors.passwordError && <div className={styles.errorMessage}>{errors.passwordError}</div>}
      </div>
    </>
  );
}
