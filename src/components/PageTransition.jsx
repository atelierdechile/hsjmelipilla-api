import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({ children }) {
  const location = useLocation();
  const [display, setDisplay] = useState(children);
  const [animClass, setAnimClass] = useState("page-enter");
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    setAnimClass("page-exit");
    const timer = setTimeout(() => {
      setDisplay(children);
      setAnimClass("page-enter");
      prevPath.current = location.pathname;
    }, 200);
    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  useEffect(() => {
    setDisplay(children);
    setAnimClass("page-enter");
  }, [children]);

  return <div className={`page-transition ${animClass}`}>{display}</div>;
}
