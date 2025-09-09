// 간단 페이지뷰 트래커
function getOrCreateSid() {
  try {
    const k = 'bl_sid_v1';
    let v = localStorage.getItem(k);
    if (!v) { v = crypto.randomUUID(); localStorage.setItem(k, v); }
    return v;
  } catch { return 'anon'; }
}

async function trackPageview() {
  try {
    const body = {
      type: 'pageview',
      path: location.pathname + location.search,
      ref: document.referrer || '',
      sid: getOrCreateSid(),
      ua: navigator.userAgent || '',
      ts: Date.now(),
      utm: Object.fromEntries(new URLSearchParams(location.search).entries()),
    };
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  } catch {}
}

export function initAnalytics() {
  // 최초 로드
  trackPageview();
  // 히스토리 이동 감지
  const _pushState = history.pushState;
  history.pushState = function (...args) {
    // @ts-ignore
    const ret = _pushState.apply(this, args);
    setTimeout(trackPageview, 0);
    return ret;
  };
  window.addEventListener('popstate', () => setTimeout(trackPageview, 0));
}