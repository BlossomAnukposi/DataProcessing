const express = require("express");
const app = express();
const morgan = require("morgan");

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS handling middleware (if needed)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

const accountRoutes = require("./com.nhlstenden/api/route/account_route");
// const episodeRoutes = require("./com.nhlstenden/api/route/episode_route");
// const genreRoutes = require("./com.nhlstenden/api/route/genre_route");
// const movieRoutes = require("./com.nhlstenden/api/route/movie_route");
// const preferenceRoutes = require("./com.nhlstenden/api/route/preference_route");
// const profileRoutes = require("./com.nhlstenden/api/route/profile_route");
// const referralRoutes = require("./com.nhlstenden/api/route/referral_discount_route");
// const seasonRoutes = require("./com.nhlstenden/api/route/season_route");
// const seriesRoutes = require("./com.nhlstenden/api/route/series_route");
// const subscriptionRoutes = require("./com.nhlstenden/api/route/subscription_route");
// const subtitleRoutes = require("./com.nhlstenden/api/route/subtitle_route");
// const watchedMediaRoutes = require("./com.nhlstenden/api/route/watched_media_list_route");
// const watchlistRoutes = require("./com.nhlstenden/api/route/watchlist_route");

//use morgan for terminal tracking of requests
app.use(morgan("dev"));

//only requests with the path /<route> can use this route...
app.use("/account", accountRoutes);
// app.use("/episode", episodeRoutes);
// app.use("/genre", genreRoutes);
// app.use("/movie", movieRoutes);
// app.use("/preference", preferenceRoutes);
// app.use("/profile", profileRoutes);
// app.use("/referral_discount", referralRoutes);
// app.use("/season", seasonRoutes);
// app.use("/series", seriesRoutes);
// app.use("/subscription", subscriptionRoutes);
// app.use("/subtitle", subtitleRoutes);
// app.use("/watched_media_list", watchedMediaRoutes);
// app.use("/watchlist", watchlistRoutes);

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
