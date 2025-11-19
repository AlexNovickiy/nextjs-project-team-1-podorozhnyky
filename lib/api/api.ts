import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const authPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/send-reset-email',
  '/auth/reset-password',
];
nextServer.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const isSessionCall = originalRequest.url?.endsWith('/auth/session');
    if (isSessionCall) {
      return Promise.reject(error);
    }

    if (authPaths.some(p => originalRequest.url?.includes(p))) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      await refreshPromise;
      return nextServer(originalRequest);
    }

    isRefreshing = true;

    refreshPromise = (async () => {
      try {
        const res = await fetch('/api/auth/session', {
          method: 'POST',
          credentials: 'include',
        });

        const data = await res.json();
        return data.success === true;
      } catch {
        return false;
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    const ok = await refreshPromise;

    if (ok) {
      return nextServer(originalRequest);
    }

    window.location.href = '/auth/login';
    return Promise.reject(error);
  }
);
