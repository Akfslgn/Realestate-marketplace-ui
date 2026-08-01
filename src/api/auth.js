const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
};

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return {};
}

function getErrorMessage(data, response) {
  if (response.status >= 500) {
    return (
      data?.message ||
      "Server is temporarily unavailable. Please try again later."
    );
  }

  return (
    data?.message ||
    data?.error ||
    response.statusText ||
    `Request failed with status ${response.status}`
  );
}

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

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response));
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

  const data = await parseResponse(response);

  console.log("Login response:", data);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response));
  }
  return data;
}
