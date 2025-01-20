// class ApiClient {
//     constructor(baseUrl) {
//         this.baseUrl = baseUrl;
//     }
//
//     getToken() {
//         return localStorage.getItem("token");
//     }
//
//     setToken(token) {
//         localStorage.setItem("token", token);
//     }
//
//     clearToken() {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     }
//
//     redirectToLogin() {
//         window.location.href = "/login.html";
//     }
//
//     async fetch(url, options = {}) {
//         const token = this.getToken();
//
//         if (!token) {
//             this.redirectToLogin();
//             return;
//         }
//
//         const headers = {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//             ...options.headers,
//         };
//
//         try {
//             const response = await fetch(`${this.baseUrl}${url}`, {
//                 ...options,
//                 headers,
//             });
//
//             if (response.status === 401 || response.status === 403) {
//                 // Token is invalid or expired
//                 this.clearToken();
//                 this.redirectToLogin();
//                 return;
//             }
//
//             return response;
//         } catch (error) {
//             console.error("API request failed:", error);
//             throw error;
//         }
//     }
// }
//
// export default ApiClient;


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
