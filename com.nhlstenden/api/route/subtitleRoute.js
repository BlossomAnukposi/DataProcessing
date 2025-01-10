const express = require("express");
const router = express.Router();
const SubtitleController = require("../controller/subtitleController");

router.get('/', SubtitleController.getAllEntries);
router.get('/:id', SubtitleController.getEntryById);
router.delete('/:id', SubtitleController.deleteEntryById);
router.post('/', SubtitleController.addSubtitle);
router.patch('/:id', SubtitleController.updateSubtitleById);

module.exports = router;
