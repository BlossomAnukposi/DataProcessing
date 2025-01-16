function checkAuthStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  // Parse the token (JWT tokens are split by dots)
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Check if token has expired
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  return true;
}

// Function to get the current user
function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

// Function to logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
