const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

router.get('/', SeasonController.getAllEntries);
router.get('/:id', SeasonController.getEntryById);
router.delete('/:id', SeasonController.deleteEntryById);
router.post('/', SeasonController.createSeason);
router.put('/:id', SeasonController.updateSeasonById);

module.exports = router;
