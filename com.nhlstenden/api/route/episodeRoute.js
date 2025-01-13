const express = require('express');
const router = express.Router();
const EpisodeController = require('../controller/episodeController');

router.get('/', EpisodeController.getAllEntries);
router.get('/:id', EpisodeController.getEntryById);
router.get('/season/:seasonId', EpisodeController.getEpisodesBySeason);
router.delete('/:id', EpisodeController.deleteEntryById);
router.post('/', EpisodeController.createEpisode);
router.put('/:id', EpisodeController.updateEpisode);

module.exports = router;