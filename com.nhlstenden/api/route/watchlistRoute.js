const express = require("express");
const router = express.Router();
const WatchlistController = require("../controller/watchlistController");

router.get("/", WatchlistController.getAllEntries);
router.get("/:id", WatchlistController.getEntryById);
router.delete("/:id", WatchlistController.deleteEntryById);
router.post("/", WatchlistController.createWatchlist);
router.get('/profile/:id', WatchlistController.getWatchlistByProfile);

module.exports = router;
