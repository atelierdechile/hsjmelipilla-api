import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { demoLogin, loginWithCredentials } from "../lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = location.state?.from || "/dashboard";

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!user.trim() || !pass.trim()) {
      setError("Debes ingresar usuario y contrasena");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const result = loginWithCredentials(user.trim(), pass.trim());
    setLoading(false);
    if (!result) {
      setError("Credenciales incorrectas");
      return;
    }
    navigate(destination, { replace: true });
  };

  const handleDashboard = () => {
    demoLogin("admin");
    navigate("/dashboard", { replace: true });
  };

  const handleCalculadora = () => {
    demoLogin("admin");
    navigate("/calculadora", { replace: true });
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

        <div className="login-panel">
          <div className="login-card">
            <div className="login-card-header">
              <div className="login-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h2>Acceso al sistema</h2>
              <p>Ingresa tus credenciales institucionales</p>
            </div>

            <form onSubmit={submit} className="login-form">
              <div className="input-group">
                <label>Usuario</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Ingresa tu usuario" />
                </div>
              </div>
              <div className="input-group">
                <label>Contrasena</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Ingresa tu contrasena" />
                </div>
              </div>
              {error && <div className="login-error"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>{error}</span></div>}
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <><span className="spinner" /><span>Ingresando...</span></> : "Ingresar"}
              </button>
            </form>

            <div className="quick-access">
              <div className="divider"><span>Acceso rapido</span></div>
              
              <button className="btn-quick" onClick={handleDashboard}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Dashboard</span>
              </button>

              <button className="btn-quick" onClick={handleCalculadora}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
                <span>Calculadora</span>
              </button>

              <button className="btn-quick btn-accent" onClick={() => window.open('https://prueba3d.onrender.com/', '_blank')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                <span>Visor 3D</span>
              </button>

              <button className="btn-back" onClick={() => navigate("/")}>
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
