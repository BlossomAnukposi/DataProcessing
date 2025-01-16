const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");

const app = express();

// Enable CORS for your frontend domain
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    credentials: true,
  })
);

app.use(express.json()); // For parsing application/json

// Add your routes
const accountRouter = require("./api/route/accountRoute");
const episodeRouter = require("./api/route/episodeRoute");

app.use("/account", accountRouter);
// Protect all episode routes with authentication
app.use("/episode", authenticateToken, episodeRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
