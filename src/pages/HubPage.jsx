import { useNavigate } from "react-router-dom";

export function HubPage() {
  const navigate = useNavigate();

  const cards = [
    {
      label: "Dashboard",
      desc: "Panel principal con KPIs, gráficos y monitoreo en tiempo real",
      path: "/dashboard",
      color: "#3b82f6",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      label: "Calculadora",
      desc: "Cálculo de indicadores clínicos y fórmulas hospitalarias",
      path: "/calculadora",
      color: "#8b5cf6",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10.01" /><line x1="12" y1="10" x2="12" y2="10.01" /><line x1="16" y1="10" x2="16" y2="10.01" /><line x1="8" y1="14" x2="8" y2="14.01" /><line x1="12" y1="14" x2="12" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" /><line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      ),
    },
    {
      label: "Visor 3D",
      desc: "Exploración interactiva del hospital en 3D",
      path: "/visor-3d",
      color: "#10b981",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{
          display: "inline-flex", padding: "8px 20px", borderRadius: "100px",
          background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)",
          color: "#93c5fd", fontSize: "12px", fontWeight: 600,
          letterSpacing: "1.5px", textTransform: "uppercase",
          marginBottom: "16px", backdropFilter: "blur(8px)",
        }}>
          Hospital San José — Melipilla
        </div>
        <h1 style={{
          fontSize: "32px", fontWeight: 800, color: "#f1f5f9",
          margin: "0 0 8px", letterSpacing: "-0.5px",
        }}>
          ¿Qué deseas hacer?
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.6)", margin: 0 }}>
          Selecciona una opción para comenzar
        </p>
      </div>

      <div style={{
        display: "flex", gap: "24px", flexWrap: "wrap",
        justifyContent: "center", maxWidth: "900px",
      }}>
        {cards.map((card) => (
          <button
            key={card.path}
            onClick={() => navigate(card.path)}
            style={{
              flex: "1 1 250px", maxWidth: "320px", minWidth: "250px",
              padding: "40px 32px", borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              cursor: "pointer", textAlign: "center",
              transition: "all 0.3s ease",
              color: "#e2e8f0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.background = "";
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "72px", height: "72px", borderRadius: "18px",
              background: `rgba(59,130,246,0.1)`,
              color: card.color, marginBottom: "20px",
            }}>
              {card.icon}
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#f1f5f9" }}>
              {card.label}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.6)", margin: 0, lineHeight: 1.5 }}>
              {card.desc}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "40px", padding: "12px 28px", borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          color: "rgba(148,163,184,0.5)", fontSize: "13px",
          cursor: "pointer", transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "rgba(148,163,184,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.color = "";
        }}
      >
        Ir al Dashboard directamente →
      </button>
    </div>
  );
}