export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 shadow-md flex items-center justify-center overflow-hidden">
        {/* BL 텍스트 */}
        <span className="text-white font-bold text-sm tracking-tighter">BL</span>
        {/* 장식적 요소 */}
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-white/20 rounded-full" />
        <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-white/15 rounded-full" />
      </div>
      <div className="text-xl font-semibold tracking-tight">BeauLead AI</div>
    </div>
  );
}