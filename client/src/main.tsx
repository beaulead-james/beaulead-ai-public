import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// --- FORCE CACHE REFRESH ---
console.log('🔥 MAIN.TSX LOADED:', new Date().toISOString(), 'CACHE_BUST:', Date.now());

// --- DEV 프리뷰 UX 안정화: 디버그 alert 억제 ---
if (import.meta.env.DEV) {
  const orig = window.alert?.bind(window) as any;
  window.alert = (msg?: any) => console.info('[dev alert suppressed]', msg);
}

createRoot(document.getElementById("root")!).render(<App />);
