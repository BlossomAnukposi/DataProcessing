const express = require("express");
const router = express.Router();
const EpisodeController = require("../controller/episodeController");
const { authenticateToken } = require("../../middleware/authMiddleware");

// All routes are already protected by middleware in app.js
router.get("/", EpisodeController.getAllEntries);
router.get("/:id", EpisodeController.getEntryById);
router.post("/", EpisodeController.createEpisode);
router.patch("/:id", EpisodeController.updateEpisode);
router.delete("/:id", EpisodeController.deleteEntryById);

module.exports = router;
