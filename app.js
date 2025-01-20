const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./com.nhlstenden/config/swaggerConfig");
// const { authenticateToken } = require("./com.nhlstenden/middleware/authMiddleware");
const AuthMiddleware = require("./com.nhlstenden/middleware/authMiddleware");

// Import routes
const accountRoutes = require("./com.nhlstenden/api/route/accountRoute");
const episodeRoutes = require("./com.nhlstenden/api/route/episodeRoute");
const genreRoutes = require("./com.nhlstenden/api/route/genreRoute");
const movieRoutes = require("./com.nhlstenden/api/route/movieRoute");
const preferenceRoutes = require("./com.nhlstenden/api/route/preferenceRoute");
const profileRoutes = require("./com.nhlstenden/api/route/profileRoute");
const referralRoutes = require("./com.nhlstenden/api/route/referralDiscountRoute");
const seasonRoutes = require("./com.nhlstenden/api/route/seasonRoute");
const seriesRoutes = require("./com.nhlstenden/api/route/seriesRoute");
const subscriptionRoutes = require("./com.nhlstenden/api/route/subscriptionRoute");
const subtitleRoutes = require("./com.nhlstenden/api/route/subtitleRoute");
const watchlistRoutes = require("./com.nhlstenden/api/route/watchlistRoute");
const watchedMediaListRoutes = require("./com.nhlstenden/api/route/watchedMediaListRoute");

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    // Initialize core middlewares
    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Swagger documentation
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // CORS handling middleware
        this.app.use(
            cors({
                origin: "*", // Allow all origins for testing
                credentials: true,
                allowedHeaders: [
                    "Origin",
                    "X-Requested-With",
                    "Content-Type",
                    "Accept",
                    "Authorization",
                ],
            })
        );

        // Morgan for logging
        this.app.use(morgan("dev"));
    }

    // Initialize routes
    initializeRoutes() {
        // Public routes
        this.app.use("/account", accountRoutes);

        // Protected routes - require authentication
        this.app.use("/episode", AuthMiddleware.authenticateToken, episodeRoutes);
        this.app.use("/genre", AuthMiddleware.authenticateToken, genreRoutes);
        this.app.use("/movie", AuthMiddleware.authenticateToken, movieRoutes);
        this.app.use("/preference", AuthMiddleware.authenticateToken, preferenceRoutes);
        this.app.use("/profile", AuthMiddleware.authenticateToken, profileRoutes);
        this.app.use("/referralDiscount", AuthMiddleware.authenticateToken, referralRoutes);
        this.app.use("/season", AuthMiddleware.authenticateToken, seasonRoutes);
        this.app.use("/series", AuthMiddleware.authenticateToken, seriesRoutes);
        this.app.use("/subscription", AuthMiddleware.authenticateToken, subscriptionRoutes);
        this.app.use("/subtitle", AuthMiddleware.authenticateToken, subtitleRoutes);
        this.app.use("/watchlist", AuthMiddleware.authenticateToken, watchlistRoutes);
        this.app.use("/watchedMediaList", AuthMiddleware.authenticateToken, watchedMediaListRoutes);
    }

    // Initialize error handling
    initializeErrorHandling() {
        // 404 Error handling
        this.app.use((req, res, next) => {
            const error = new Error("Not Found");
            error.status = 404;
            next(error);
        });

        // General error handling
        this.app.use((error, req, res, next) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message,
                },
            });
        });
    }

    // Expose the app instance
    getApp() {
        return this.app;
    }
}

module.exports = new App().getApp();
