const jwtKey = 'jwtToken';

export const setJwtToken = (token: string) =>
  localStorage.setItem(jwtKey, token);

export const getJwtToken = () => localStorage.getItem(jwtKey);

export const getJwtAuthHeader = () => ({
  Authorization: `Bearer ${getJwtToken()}`,
});

export const hasJwtToken = () => !!localStorage.getItem(jwtKey);

export const removeJwtToken = () => localStorage.removeItem(jwtKey);
