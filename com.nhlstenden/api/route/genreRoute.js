const express = require('express');
const router = express.Router();
const GenreController = require('../controller/genreController');

router.get('/', GenreController.getAllEntries);
router.get('/:id', GenreController.getEntryById);
router.delete('/:id', GenreController.deleteEntryById);
// router.get('/:id', GenreController.getEpisodesBySeason);
// router.post('/', GenreController.create_episode);
// router.put('/:id', GenreController.update_episode);

module.exports = router;