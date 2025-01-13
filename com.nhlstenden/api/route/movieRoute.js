const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movieController');

router.get('/', MovieController.getAllEntries);
router.get('/:id', MovieController.getEntryById);
router.delete('/:id', MovieController.deleteEntryById);
router.post('/', MovieController.createMovie);
router.put('/:id', MovieController.updateMovie);

// movie subtitles

module.exports = router;