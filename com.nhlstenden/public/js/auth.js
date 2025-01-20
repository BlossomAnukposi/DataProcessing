// class AuthManager {
//     static getToken() {
//         return localStorage.getItem("token");
//     }
//
//     static getUser() {
//         const userStr = localStorage.getItem("user");
//         return userStr ? JSON.parse(userStr) : null;
//     }
//
//     static setToken(token) {
//         localStorage.setItem("token", token);
//     }
//
//     static setUser(user) {
//         localStorage.setItem("user", JSON.stringify(user));
//     }
//
//     static clearAuthData() {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     }
//
//     static checkAuthStatus() {
//         const token = this.getToken();
//         if (!token) {
//             return false;
//         }
//
//         try {
//             // Parse the token payload (JWT tokens are split by dots)
//             const payload = JSON.parse(atob(token.split(".")[1]));
//
//             // Check if the token has expired
//             if (payload.exp * 1000 < Date.now()) {
//                 this.clearAuthData();
//                 return false;
//             }
//
//             return true;
//         } catch (error) {
//             console.error("Invalid token format:", error);
//             this.clearAuthData();
//             return false;
//         }
//     }
//
//     static logout() {
//         this.clearAuthData();
//         window.location.href = "login.html";
//     }
// }
//
// export default AuthManager;


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
