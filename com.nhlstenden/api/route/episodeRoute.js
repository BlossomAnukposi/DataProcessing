const express = require("express");
const router = express.Router();
const EpisodeController = require("../controller/episodeController");

// All routes are already protected by middleware in app.js
router.get("/", EpisodeController.getAllEntries);
router.get("/:id", EpisodeController.getEntryById);
router.post("/", EpisodeController.createEpisode);
router.put("/:id", EpisodeController.updateEpisode);
router.delete("/:id", EpisodeController.deleteEntryById);
router.get("/season/:id", EpisodeController.getEpisodesBySeason);

module.exports = router;
