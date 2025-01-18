const express = require("express");
const router = express.Router();
const WatchedMediaListController = require("../controller/watchedMediaListController");

router.get("/", WatchedMediaListController.getAllEntries);
router.get("/:id", WatchedMediaListController.getEntryById);
router.delete("/:id", WatchedMediaListController.deleteEntryById);
router.post("/", WatchedMediaListController.createWatchedMediaList);
router.get('/profile/:id', WatchedMediaListController.getWatchedMediaListByProfile);

module.exports = router;
