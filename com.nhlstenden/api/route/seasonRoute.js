const express = require("express");
const router = express.Router();
const SeasonController = require("../controller/seasonController");

router.get('/', SeasonController.getAllEntries);
router.get('/:id', SeasonController.getEntryById);
router.delete('/:id', SeasonController.deleteEntryById);
router.post('/', SeasonController.createSeason);
router.put('/:id', SeasonController.updateSeason);

// season episodes

module.exports = router;