const jwtKey = 'jwtToken';

export const setJwtToken = (token: string) =>
  localStorage.setItem(jwtKey, token);

export const getJwtToken = () => localStorage.getItem(jwtKey);
