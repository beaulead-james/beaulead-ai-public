import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function TagsInput({
  value = [],
  onChange,
  placeholder = "태그 입력 후 Enter",
}: { value?: string[]; onChange?: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = (t: string) => {
    const v = t.trim();
    if (!v) return;
    const next = Array.from(new Set([...(value||[]), v]));
    onChange?.(next);
    setDraft("");
  };
  const remove = (t: string) => onChange?.((value||[]).filter(x => x !== t));
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {(value||[]).map(t => (
          <Badge key={t} variant="secondary" className="gap-1">
            {t}
            <X className="w-3 h-3 cursor-pointer" onClick={()=>remove(t)} />
          </Badge>
        ))}
      </div>
      <Input
        value={draft}
        placeholder={placeholder}
        onChange={(e)=>setDraft(e.target.value)}
        onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); add(draft);} }}
      />
    </div>
  )
}