const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "client-web",
};

/**
 * POST /auth/register
 * @param {Object} payload {username, email, password}
 * @return {Promise<Object>} {message, user}
 */
export async function registerUser(payload) {
  const url = `${API_BASE}${API_PREFIX}/auth/register`;
  const { email, username, password } = payload;
  const response = await fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

/**
 * POST /auth/login
 * @param {Object} payload {email, password}
 * @return {Promise<Object>} {token, user}
 */
export async function loginUser(payload) {
  const url = `${API_BASE}${API_PREFIX}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Login response:", data);

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}
