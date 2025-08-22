const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "client-web",
};

/**
 * PUT /users/{userId}
 * @param {number} userId - The user ID
 * @param {Object} payload {email, username, password}
 * @return {Promise<Object>} {message, user}
 */
export async function updateUser(token, userId, payload) {
  const url = `${API_BASE}${API_PREFIX}/users/${userId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Update user response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * PUT /users/{userId}/profile
 * @param {number} userId - The user ID
 * @param {Object} payload {avatar_url, bio, city, first_name, last_name, phone_number, state, zip_code}
 * @return {Promise<Object>} {message, profile}
 */
export async function updateUserProfile(token, userId, payload) {
  console.log("Making updateUserProfile request with headers", jsonHeaders);
  const url = `${API_BASE}${API_PREFIX}/users/${userId}/profile`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Update profile response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * Get /users/{userId}
 * @param {number} userId - The user ID
 * @return {Promise<Object>} {user}
 */
export async function getUserById(token, userId) {
  const url = `${API_BASE}${API_PREFIX}/users/${userId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  console.log("User response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * PATCH /users/{userId}/profile/image
 * @param {string} token - Authorization token
 * @param {number} userId - The user ID
 * @param {File} imageFile - The image file to upload
 * @return {Promise<Object>} {message, profile}
 */
export async function uploadProfileImage(token, userId, imageFile) {
  const url = `${API_BASE}${API_PREFIX}/users/${userId}/profile/image`;

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "client-web",
      // Don't set Content-Type for FormData - browser will set it automatically with boundary
    },
    body: formData,
  });

  const data = await response.json();

  console.log("Upload image response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * POST /wishlist/{userId}/listing/{listingId}
 * @param {string} token - Authorization token
 * @param {number} userId - The user ID
 * @param {number} listingId - The listing ID
 * @return {Promise<Object>} Response from API
 */
export async function addToWishlist(token, userId, listingId) {
  const url = `${API_BASE}${API_PREFIX}/wishlist/${userId}/listing/${listingId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "User-Agent": "client-web",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("Add to wishlist response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * DELETE /wishlist/{userId}/wishlist-item/{wishlistItemId}
 * @param {string} token - Authorization token
 * @param {number} userId - The user ID
 * @param {number} wishlistItemId - The wishlist item ID
 * @return {Promise<Object>} Response from API
 */
export async function removeFromWishlist(token, userId, wishlistItemId) {
  const url = `${API_BASE}${API_PREFIX}/wishlist/${userId}/wishlist-item/${wishlistItemId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "User-Agent": "client-web",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("Remove from wishlist response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}
