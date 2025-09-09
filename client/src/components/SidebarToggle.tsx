import { useSidebarState } from "@/hooks/useSidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function SidebarToggle() {
  const { collapsed, setCollapsed } = useSidebarState();
  
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="fixed z-[100] left-3 top-3 inline-flex h-9 items-center gap-2 rounded-xl bg-slate-900/70 px-3 text-slate-200 ring-1 ring-white/10 backdrop-blur-md hover:bg-slate-800/80"
      aria-label="Toggle sidebar"
    >
      {collapsed ? <PanelLeftOpen className="h-4 w-4"/> : <PanelLeftClose className="h-4 w-4"/>}
      <span className="hidden md:inline text-sm">{collapsed ? "펼치기" : "접기"}</span>
    </button>
  );
}