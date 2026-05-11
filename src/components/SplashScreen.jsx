import { useEffect, useState } from "react";

export function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2200);
    const t2 = setTimeout(() => onFinish(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${phase}`}>
      <div className="splash-bg">
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </div>
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <svg className="splash-logo" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          <div className="splash-ring" />
        </div>
        <div className="splash-text">
          <h1>Hospital San José</h1>
          <p>Melipilla</p>
        </div>
        <div className="splash-loader">
          <div className="splash-loader-bar" />
        </div>
      </div>
    </div>
  );
}
