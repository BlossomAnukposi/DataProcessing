const express = require('express');
const router = express.Router();
const GenreController = require('../controller/genreController');

router.get('/', GenreController.getAllEntries);
router.get('/:id', GenreController.getEntryById);
router.delete('/:id', GenreController.deleteEntryById);
router.post('/', GenreController.createGenre);

// genre movies
// genre series

module.exports = router;