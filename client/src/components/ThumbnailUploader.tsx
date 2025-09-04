import React, { useRef, useState, useEffect } from 'react';

interface ThumbnailUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ThumbnailUploader({ value, onChange }: ThumbnailUploaderProps) {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const pick = () => inputRef.current?.click();

  // 이미지 URL 유효성 검사
  const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && (response.headers.get('content-type')?.startsWith('image/') ?? false);
    } catch {
      return false;
    }
  };

  // 컴포넌트 마운트시 기존 이미지 URL 검증
  useEffect(() => {
    if (value && !imageLoaded && !imageError) {
      setIsValidating(true);
      validateImageUrl(value).then(isValid => {
        setIsValidating(false);
        if (!isValid) {
          setImageError(true);
          console.warn(`Invalid image URL: ${value}`);
        }
      });
    }
  }, [value, imageLoaded, imageError]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return;
    
    setErr('');
    setImageError(false);
    setImageLoaded(false);
    
    // 파일 크기 검증
    if (file.size > 3*1024*1024) {
      return setErr('최대 3MB까지 가능합니다.');
    }
    
    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      return setErr('이미지 파일만 업로드 가능합니다.');
    }
    
    try {
      setBusy(true);
      const fd = new FormData(); 
      fd.append('file', file);
      
      const res = await fetch('/api/uploads/image', { 
        method: 'POST', 
        body: fd, 
        credentials: 'include' 
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} - ${errorText}`);
      }
      
      const data = await res.json();
      
      // 업로드 성공시 바로 적용 (검증은 백그라운드에서)
      onChange(data.url);
      
      // 백그라운드에서 검증 (개발 환경에서만, 실패해도 무시)
      if (process.env.NODE_ENV === 'development') {
        setTimeout(async () => {
          try {
            const isValid = await validateImageUrl(data.url);
            console.log(`이미지 검증: ${data.url} - ${isValid ? '성공' : '실패 (무시됨)'}`);
          } catch (error) {
            // 검증 실패해도 무시
          }
        }, 2000); // 2초 후 검증 (더 여유있게)
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErr(error instanceof Error ? error.message : '업로드 실패');
    } finally { 
      setBusy(false); 
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setIsValidating(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    setIsValidating(false);
    console.error(`Failed to load image: ${value}`);
  };

  const removeImage = () => {
    onChange('');
    setImageError(false);
    setImageLoaded(false);
    setIsValidating(false);
  };

  const retryLoadImage = () => {
    setImageError(false);
    setImageLoaded(false);
    if (value) {
      setIsValidating(true);
      // 이미지 재로드 트리거
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
        setIsValidating(false);
      };
      img.onerror = () => {
        setImageError(true);
        setIsValidating(false);
      };
      img.src = value + '?t=' + Date.now(); // 캐시 무효화
    }
  };

  return (
    <div className='rounded-xl border border-slate-700/40 p-6 bg-slate-900 not-prose' data-testid="thumbnail-uploader">
      <div className='flex items-start gap-6'>
        <div className='w-48 h-32 rounded-lg bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-700/50 relative'>
          {value && !imageError ? (
            <>
              {(isValidating || !imageLoaded) && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  {isValidating && (
                    <span className="absolute bottom-2 text-xs text-blue-400">검증 중...</span>
                  )}
                </div>
              )}
              <img 
                src={value} 
                alt="썸네일 미리보기"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                data-testid="thumbnail-preview"
              />
            </>
          ) : imageError ? (
            <div className="text-center p-4 w-full">
              <svg className="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className='text-red-400 text-xs mb-2'>이미지 로딩 실패</p>
              <button 
                onClick={retryLoadImage}
                className='text-xs text-blue-400 hover:text-blue-300 underline'
                type="button"
              >
                다시 시도
              </button>
            </div>
          ) : (
            <div className="text-center p-4">
              <svg className="w-12 h-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className='text-slate-400 text-sm font-medium'>썸네일 이미지</p>
              <p className='text-slate-500 text-xs mt-1'>1200×630 권장</p>
            </div>
          )}
        </div>
        
        <div className='flex-1 space-y-4'>
          <div>
            <h3 className='text-lg font-medium text-slate-200 mb-2'>대표 이미지</h3>
            <p className='text-sm text-slate-400 leading-relaxed'>
              블로그 카드와 소셜 미디어 공유 시 표시될 썸네일 이미지입니다.
              <br />
              최적 비율: 16:9 (1200×630px), 최대 크기: 3MB
            </p>
          </div>
          
          <div className='flex gap-3 flex-wrap'>
            <button 
              type='button' 
              onClick={pick} 
              disabled={busy}
              className='px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2'
              data-testid="button-upload-image"
            >
              {busy ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  업로드 중…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {value ? '새 이미지 선택' : '이미지 선택'}
                </>
              )}
            </button>
            
            {value && (
              <button 
                type='button' 
                onClick={removeImage}
                className='px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors duration-200 flex items-center gap-2'
                data-testid="button-remove-image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                제거
              </button>
            )}
          </div>
          
          {err && (
            <div className='p-3 rounded-lg bg-red-900/20 border border-red-500/20'>
              <div className='flex items-center gap-2'>
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className='text-red-400 text-sm font-medium'>{err}</span>
              </div>
            </div>
          )}

          {/* 디버깅 정보 (개발 환경에서만) */}
          {process.env.NODE_ENV === 'development' && value && (
            <div className='text-xs text-slate-500 bg-slate-800/50 p-2 rounded border-l-2 border-slate-600'>
              <div className='font-medium mb-1'>디버그 정보:</div>
              <div>URL: {value}</div>
              <div>상태: {imageLoaded ? '로드됨' : imageError ? '오류' : '로딩중'}</div>
            </div>
          )}
          
          <input 
            ref={inputRef} 
            type='file' 
            accept='image/*' 
            className='hidden' 
            onChange={onFile}
            data-testid="file-input"
          />
        </div>
      </div>
    </div>
  );
}