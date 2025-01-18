const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movieController');

router.get('/media/', MovieController.getAllMedia);
router.get('/', MovieController.getAllEntries);
router.get('/:id', MovieController.getEntryById);
router.delete('/:id', MovieController.deleteEntryById);
router.post('/', MovieController.createMovie);
router.put('/:id', MovieController.updateMovie);
// router.get('/search/:title', MovieController.searchMovies);

// movie subtitles

module.exports = router;