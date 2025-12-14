import { jwtDecode } from "jwt-decode";


export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

export const getUserRole = (): "ADMIN" | "USER" | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
