import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// === FINAL CACHE BUSTER ${Date.now()} ===
window.alert('🔥 CACHE CLEARED! NEW VIDEO: ekS18FZU-GE 🔥');
console.log('🔥🔥🔥 MAIN LOADED:', Date.now(), 'VIDEO:', 'ekS18FZU-GE');

createRoot(document.getElementById("root")!).render(<App />);
