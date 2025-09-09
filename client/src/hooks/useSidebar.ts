import { useEffect, useState } from "react";

const KEY = "admin_sidebar_collapsed";

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { 
      return localStorage.getItem(KEY) === "1"; 
    } catch { 
      return false; 
    }
  });

  useEffect(() => {
    try { 
      localStorage.setItem(KEY, collapsed ? "1" : "0"); 
    } catch {}
    
    const root = document.documentElement;
    root.classList.toggle("admin-sidebar-collapsed", collapsed);
  }, [collapsed]);

  return { collapsed, setCollapsed };
}