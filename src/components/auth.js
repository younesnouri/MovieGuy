
document.addEventListener('DOMContentLoaded', () => {
  
    console.log('LOADINGGG')
    const token = localStorage.getItem('token');
    if (token) {
      authenticateToken(token).then(isValid => {
            if (isValid) {
                console.log('User is authenticated');
            } else {
                localStorage.removeItem('token');
                redirectToLogin();
            }
        });
    } else {
        redirectToLogin();
    }
  });
  
  async function authenticateToken(token) {
    try {
        const response = await fetch('http://localhost:5000/validate_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
  }
  
  function redirectToLogin() {
    window.location.href = '/login';
  }
  
  