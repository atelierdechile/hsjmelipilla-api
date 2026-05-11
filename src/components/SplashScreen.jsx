import { useEffect, useState } from "react";

export function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2500);
    const t2 = setTimeout(() => onFinish(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${phase}`}>
      <div className="splash-bg">
        <div className="splash-bg-image" />
        <div className="splash-bg-overlay" />
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </div>

      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className="splash-ring-outer" />
          <div className="splash-ring-mid" />
          <div className="splash-ring-inner" />
          <svg className="splash-logo" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            <circle cx="12" cy="12" r="8" strokeWidth="0.8" opacity="0.3" />
          </svg>
        </div>

        <div className="splash-text">
          <h1>Hospital San José</h1>
          <p>Melipilla</p>
        </div>

        <div className="splash-loader">
          <div className="splash-loader-track">
            <div className="splash-loader-bar" />
          </div>
          <span className="splash-loader-text">Inicializando sistema...</span>
        </div>

        <div className="splash-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`splash-particle p-${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
