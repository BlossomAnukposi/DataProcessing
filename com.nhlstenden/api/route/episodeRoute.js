const express = require('express');
const router = express.Router();
const EpisodeController = require('../controller/episodeController');

router.get('/', EpisodeController.getAllEntries);
router.get('/:id', EpisodeController.getEntryById);
router.get('/:id', EpisodeController.getEpisodesBySeason);
router.delete('/:id', EpisodeController.deleteEntryById);
router.get('/:id', EpisodeController.getEpisodesBySeason);
// router.post('/', EpisodeController.create_episode);
// router.put('/:id', EpisodeController.update_episode);

module.exports = router;