async function authenticatedFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 || response.status === 403) {
      // Token is invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login.html";
      return;
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
