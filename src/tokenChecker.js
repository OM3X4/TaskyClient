import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) return true;

    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return exp < currentTime; // Returns true if expired
};