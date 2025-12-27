import { jwtDecode } from 'jwt-decode';

const jwtKey = 'jwtToken';

export const setJwtToken = (token: string) =>
  localStorage.setItem(jwtKey, token);

export const getJwtToken = () => localStorage.getItem(jwtKey);

export const getJwtAuthHeader = () => ({
  Authorization: `Bearer ${getJwtToken()}`,
});

export const hasJwtToken = () => !!localStorage.getItem(jwtKey);

export const removeJwtToken = () => localStorage.removeItem(jwtKey);

export const isTokenExpired = () => {
  const token = getJwtToken();
  if (!token || token === 'undefined') return true;

  const payload = jwtDecode(token);
  if (!payload.exp) return true;

  const currentTime = Date.now() / 1000;

  return payload.exp < currentTime;
};
