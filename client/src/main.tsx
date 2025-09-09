import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// CACHE BUSTER TEST
console.log('🚨 MAIN.TSX LOADED - VIDEO ID: ekS18FZU-GE 🚨', Date.now());
alert('MAIN.TSX LOADED! Video should be: ekS18FZU-GE');

createRoot(document.getElementById("root")!).render(<App />);
