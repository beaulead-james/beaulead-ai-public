// API 유틸리티 함수들

export async function logout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // localStorage에서 사용자 정보와 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // 기존 키도 제거 (호환성)
    localStorage.removeItem('userData'); // 기존 키도 제거 (호환성)
    
    return true;
  } catch (error) {
    // 실패해도 로컬 데이터는 정리
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    return false;
  }
}

// 인증된 사용자 정보 가져오기 (세션 및 JWT 토큰 지원)
export async function fetchMe() {
  try {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // JWT 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',  // 쿠키 세션 지원
      headers
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.authenticated ? data : null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}