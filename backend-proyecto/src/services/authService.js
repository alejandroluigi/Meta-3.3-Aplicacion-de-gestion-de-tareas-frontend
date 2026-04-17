const API_BASE = 'http://localhost:3000';

let csrfToken = localStorage.getItem('csrfToken') || '';

const authService = {
  async login(email) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'mi_api_key_secreta_12345'
      },
      credentials: 'include',
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    if (data.csrfToken) {
      csrfToken = data.csrfToken;
      localStorage.setItem('csrfToken', csrfToken);
    }

    return data;
  },

  // ✅ SIN CSRF
  async verify() {
    const response = await fetch(`${API_BASE}/api/auth/verify`, {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  // ✅ CON CSRF
  async logout() {
    const response = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken
      },
      credentials: 'include'
    });

    const data = await response.json();

    localStorage.removeItem('csrfToken');
    csrfToken = '';

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },

  getCsrfToken() {
    return csrfToken;
  }
};

export default authService;