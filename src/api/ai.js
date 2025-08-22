const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "client-web",
};

/**
 * POST /api/v1/ai/chat/listing/{listingId}
 * @param {Object} payload {message}
 * @param {number} listingId - listing id
 * @return {Promise<Object>} {message, listing_id}
 */
export async function chat(token, payload, listingId) {
  const url = `${API_BASE}${API_PREFIX}/ai/chat/listing/${listingId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message: payload.message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Something went wrong.");
  }

  return data;
}

/**
 * POST /api/v1/ai/search
 * @param {Object} payload {query}
 * @return {Promise<Object>} {message, recommended_listings}
 */
export async function searchWithAI(token, payload) {
  const url = `${API_BASE}${API_PREFIX}/ai/search`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: payload.query }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Search failed.");
  }

  return data;
}
