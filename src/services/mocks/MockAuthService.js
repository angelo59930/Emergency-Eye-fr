import { mockUsers } from './mockData';

export class MockAuthService {
  async login(username, password) {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email
    }));

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email
      }
    };
  }

  async logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('token');
  }
}
