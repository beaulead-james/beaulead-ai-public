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