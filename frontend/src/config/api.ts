export const API_URL: string =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export function getToken(): string {
  return localStorage.getItem('token') || '';
}

export function authHeaders(extra?: Record<string, string>) {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {}),
    ...(extra ?? {}),
  };
}

export async function apiJson<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | any }> {
  const res = await fetch(`${API_URL}${path}`, init);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
