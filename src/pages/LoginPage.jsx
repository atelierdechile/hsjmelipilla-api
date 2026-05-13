import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithCredentials, loginReal } from "../lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef(null);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = location.state?.from || "/hub";

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  const clearFieldError = (field) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    const u = user.trim();
    const p = pass.trim();
    if (!u) errs.user = "Ingresa tu usuario";
    else if (u.length < 3) errs.user = "El usuario debe tener al menos 3 caracteres";
    if (!p) errs.pass = "Ingresa tu contraseña";
    else if (p.length < 3) errs.pass = "La contraseña debe tener al menos 3 caracteres";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await loginReal(user.trim(), pass.trim());
      if (result) {
        setLoading(false);
        navigate(destination, { replace: true });
        return;
      }
    } catch {
      setServerError("Error de conexión con el servidor");
      setLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      const mock = loginWithCredentials(user.trim(), pass.trim());
      setLoading(false);
      if (!mock) {
        setServerError("Credenciales incorrectas");
        setErrors({ user: " ", pass: " " });
        return;
      }
      navigate(destination, { replace: true });
    } catch {
      setServerError("Error inesperado al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg">
        <div className="login-bg-overlay" />
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
        </div>
      </div>

      <div className="login-content">
        <div className="login-grid">
          <div className="login-hero">
            <div className="hero-content">
              <div className="hero-badge">Hospital San Jose</div>
              <h1>Plataforma de Gestion Hospitalaria</h1>
              <p>Monitoreo de camas, indicadores clinicos y optimizacion de procesos asistenciales en tiempo real.</p>
              <div className="hero-stats">
                <div className="stat-card"><span className="stat-value">+450</span><span className="stat-label">Camas</span></div>
                <div className="stat-card"><span className="stat-value">85%</span><span className="stat-label">Ocupacion</span></div>
                <div className="stat-card"><span className="stat-value">24/7</span><span className="stat-label">Monitoreo</span></div>
              </div>
            </div>
          </div>

          <div className="login-card">
            <div className="login-card-header">
              <div className="login-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h2>Acceso al sistema</h2>
              <p>Ingresa tus credenciales institucionales</p>
            </div>

            <form onSubmit={submit} className="login-form" noValidate>
              <div className="input-group">
                <label>Usuario</label>
                <div className={`input-wrapper ${errors.user ? "input-error" : ""}`}>
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    ref={userRef}
                    type="text"
                    value={user}
                    onChange={(e) => { setUser(e.target.value); clearFieldError("user"); }}
                    onBlur={() => { if (!user.trim()) setErrors((prev) => ({ ...prev, user: "Ingresa tu usuario" })); }}
                    placeholder="Ingresa tu usuario"
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>
                {errors.user && <span className="input-feedback">{errors.user.trim() || "Credenciales incorrectas"}</span>}
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <div className={`input-wrapper ${errors.pass ? "input-error" : ""}`}>
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => { setPass(e.target.value); clearFieldError("pass"); }}
                    onBlur={() => { if (!pass.trim()) setErrors((prev) => ({ ...prev, pass: "Ingresa tu contraseña" })); }}
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPass ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
                {errors.pass && <span className="input-feedback">{errors.pass.trim() || "Credenciales incorrectas"}</span>}
              </div>

              {serverError && (
                <div className="login-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  <span>{serverError}</span>
                </div>
              )}

              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <><span className="spinner" /><span>Ingresando...</span></> : "Ingresar"}
              </button>
            </form>

            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <button className="btn-back" onClick={() => navigate("/")} style={{ display: "inline-flex", width: "auto", padding: "8px 16px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>Volver al inicio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}