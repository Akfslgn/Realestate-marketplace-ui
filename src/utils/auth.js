import { jwtDecode } from "jwt-decode";

const STORAGE_KEY = "reState_token";

export function saveToken(token) {
  console.log("Setting STORAGE_KEY", token);
  localStorage.setItem(STORAGE_KEY, token);
}

export function getToken() {
  console.log("Getting STORAGE_KEY", localStorage.getItem(STORAGE_KEY));
  return localStorage.getItem(STORAGE_KEY);
}

export function clearToken() {
  console.log("Clearing STORAGE_KEY", localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
}

export function isTokenValid(token = getToken()) {
  console.log("Is valid token activated");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    console.log("Token Decode:", decodedToken);
    return Date.now() < decodedToken.exp * 1000;
  } catch {
    return false;
  }
}

export function getDecodedToken(token = getToken()) {
  console.log("Getting decoded token");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    console.log("Token Decode:", decodedToken);
    return decodedToken;
  } catch {
    return false;
  }
}
