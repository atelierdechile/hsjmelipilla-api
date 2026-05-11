import { useEffect, useRef, useState } from "react";

export default function GaugeChart({ value }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const pathRef = useRef(null);

  useEffect(() => {
    setAnimatedValue(Math.max(0, Math.min(100, value || 0)));
  }, [value]);

  const clamped = Math.max(0, Math.min(100, animatedValue));

  const getColor = () => {
    if (clamped < 70) return { solid: "#ef4444", light: "rgba(239,68,68,0.15)" };
    if (clamped < 85) return { solid: "#f59e0b", light: "rgba(245,158,11,0.15)" };
    return { solid: "#22c55e", light: "rgba(34,197,94,0.15)" };
  };

  const color = getColor();
  const circumference = Math.PI * 80;

  useEffect(() => {
    if (pathRef.current) {
      const offset = circumference * (1 - clamped / 100);
      pathRef.current.style.strokeDashoffset = offset;
    }
  }, [clamped, circumference]);

  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 200 125" className="gauge-svg">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          className="gauge-track"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color.solid}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease",
            filter: `drop-shadow(0 0 8px ${color.light})`,
          }}
        />
      </svg>
      <div className="gauge-center">
        <span className="gauge-value" style={{ color: color.solid }}>
          {clamped.toFixed(1)}%
        </span>
        <span className="gauge-label">Ocupación</span>
      </div>
    </div>
  );
}
