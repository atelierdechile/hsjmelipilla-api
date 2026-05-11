import { Link } from "react-router-dom";
import { useMemo } from "react";

const features = [
  { title: "Visualización en tiempo real", desc: "Indicadores clínicos críticos disponibles de forma inmediata para decisiones oportunas." },
  { title: "Gestión de camas", desc: "Control completo de ocupación hospitalaria, disponibilidad y rotación." },
  { title: "Eficiencia operativa", desc: "Reducción de tiempos de espera y mejora continua de procesos asistenciales." },
];

export function LandingPage() {
  const stats = useMemo(() => [
    { value: "+450", label: "Camas" },
    { value: "85%", label: "Ocupación" },
    { value: "24/7", label: "Monitoreo" },
  ], []);

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
        </div>

        <div className="landing-nav">
          <div className="landing-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <span>Hospital SJ</span>
          </div>
          <Link to="/login" className="landing-btn-nav">Acceder</Link>
        </div>

        <div className="landing-hero-body">
          <div className="landing-hero-content">
            <div className="landing-badge">Plataforma clínica</div>
            <h1>Gestión hospitalaria en tiempo real</h1>
            <p>Monitoreo de camas, indicadores clínicos y optimización de procesos asistenciales.</p>
            <Link to="/login" className="landing-btn-primary">
              <span>Acceder al sistema</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div className="landing-stats">
            {stats.map((s) => (
              <div key={s.label} className="landing-stat-card">
                <span className="landing-stat-value">{s.value}</span>
                <span className="landing-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">Capacidades de la plataforma</h2>
        <div className="landing-features-grid">
          {features.map((f, i) => (
            <article key={f.title} className="landing-feature-card" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <div className="landing-feature-icon">
                {i === 0 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                ) : i === 1 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                )}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-card">
          <h2>Acceso seguro para personal autorizado</h2>
          <p>Plataforma interna con monitoreo continuo y soporte en tiempo real.</p>
          <Link to="/login" className="landing-btn-primary">
            <span>Ir al sistema</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 Hospital San José de Melipilla</p>
      </footer>
    </div>
  );
}
