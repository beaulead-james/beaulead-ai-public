import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Dev preview에서 디버그 alert가 UX를 방해하지 않도록 우회
if (import.meta.env.DEV) {
  const origAlert = window.alert?.bind(window) as (msg?: any) => void
  window.alert = (msg?: any) => {
    // 디버그 메시지는 콘솔로만 표시
    // 필요하면 origAlert(msg)로 복구 가능
    console.info('[dev alert suppressed]', msg)
  }
}

createRoot(document.getElementById("root")!).render(<App />);
