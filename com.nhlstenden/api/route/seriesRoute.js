const express = require("express");
const router = express.Router();
const SeriesController = require("../controller/seriesController");

router.get('/', SeriesController.getAllEntries);
router.get('/:id', SeriesController.getEntryById);
router.delete('/:id', SeriesController.deleteEntryById);
// router.post('/', SeriesController.createAccount);
// router.patch('/:id', SeriesController.updateAccount);

module.exports = router;