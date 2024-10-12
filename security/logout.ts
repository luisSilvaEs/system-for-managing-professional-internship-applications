// /security/logout.ts
export async function handleLogout() {
    
    await fetch('/api/logout', {
        method: 'GET',
    });

    // Clear local storage
    localStorage.removeItem('userInfo');

    window.location.href = '/login';
}
  