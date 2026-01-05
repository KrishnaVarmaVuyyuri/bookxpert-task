const AUTH_KEY = "isAuthenticated";

export const login = (email, password) => {
  if (email && password) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};
