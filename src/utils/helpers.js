// any helper functions go here
export function isAuthPath(path) {
    return path === '/' || path === '/signup' || path === '/login';
  }

export function isValidPassword(password) {
    if (!password || password.length < 6) {
        return false;
    }
    // Check if password contains at least one digit
    return /\d/.test(password);
}