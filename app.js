const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { authenticateToken,} = require("./com.nhlstenden/middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./com.nhlstenden/config/swaggerConfig");

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS handling middleware
app.use(
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
app.use(morgan("dev"));

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

// Public routes
app.use("/account", accountRoutes);

// Protected routes - require authentication
app.use("/episode", authenticateToken, episodeRoutes);
app.use("/genre", authenticateToken, genreRoutes);
app.use("/movie", authenticateToken, movieRoutes);
app.use("/preference", authenticateToken, preferenceRoutes);
app.use("/profile", authenticateToken, profileRoutes);
app.use("/referralDiscount", authenticateToken, referralRoutes);
app.use("/season", authenticateToken, seasonRoutes);
app.use("/series", authenticateToken, seriesRoutes);
app.use("/subscription", authenticateToken, subscriptionRoutes);
app.use("/subtitle", authenticateToken, subtitleRoutes);
app.use("/watchlist", authenticateToken, watchlistRoutes);
app.use("/watchedMediaList", authenticateToken, watchedMediaListRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
