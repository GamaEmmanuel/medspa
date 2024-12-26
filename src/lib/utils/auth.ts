import type { Staff, AuthState } from '../types/staff';

const AUTH_STORAGE_KEY = 'serenity_medspa_auth';

export function saveAuthToStorage(auth: AuthState, keepSignedIn: boolean): void {
  if (keepSignedIn) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  }
}

export function clearAuthFromStorage(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getStoredAuth(): AuthState | null {
  const localAuth = localStorage.getItem(AUTH_STORAGE_KEY);
  const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
  
  if (localAuth) {
    return JSON.parse(localAuth);
  }
  
  if (sessionAuth) {
    return JSON.parse(sessionAuth);
  }
  
  return null;
}