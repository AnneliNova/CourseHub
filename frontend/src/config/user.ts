export type StoredUser = {
  id?: string;
  name?: string | null;
  email?: string;
  role?: 'admin' | 'user' | string;
};

export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function isAdmin(): boolean {
  const u = getStoredUser();
  return String(u?.role || '').toLowerCase() === 'admin';
}
