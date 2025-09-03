import React, { useRef, useState } from 'react';

export default function ThumbnailUploader({
  value, onChange,
}: { value?: string; onChange: (url: string) => void; }) {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const pick = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setErr('');
    if (file.size > 3*1024*1024) return setErr('최대 3MB까지 가능합니다.');
    try {
      setBusy(true);
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/uploads/image', { method: 'POST', body: fd, credentials: 'include' });
      const data = await res.json();
      onChange(data.url);
    } catch {
      setErr('업로드 실패');
    } finally { setBusy(false); }
  };

  return (
    <div className='rounded-xl border border-slate-700/40 p-4 bg-slate-900 not-prose'>
      <div className='flex items-center gap-4'>
        <div className='w-40 h-24 rounded-lg bg-slate-800 overflow-hidden flex items-center justify-center'>
          {value ? <img src={value} className='w-full h-full object-cover' /> :
            <span className='text-slate-400 text-sm'>1200×630 권장</span>}
        </div>
        <div className='flex-1 space-y-2'>
          <div className='text-sm text-slate-300'>대표 이미지(썸네일)</div>
          <div className='flex gap-2'>
            <button type='button' onClick={pick} disabled={busy}
              className='px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60'>
              {busy ? '업로드 중…' : '이미지 선택/업로드'}
            </button>
            {value && (
              <button type='button' onClick={() => onChange('')}
                className='px-3 py-2 rounded-lg bg-slate-700 text-white'>제거</button>
            )}
          </div>
          {err && <div className='text-xs text-red-400'>{err}</div>}
          <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onFile}/>
        </div>
      </div>
    </div>
  );
}