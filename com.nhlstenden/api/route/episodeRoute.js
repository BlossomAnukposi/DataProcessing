const express = require('express');
const router = express.Router();
const EpisodeController = require('../controller/episodeController');

router.get('/', EpisodeController.getAllEntries);
router.get('/:id', EpisodeController.getEntryById);
router.get('/season/:id', EpisodeController.getEpisodesBySeason);
router.delete('/:id', EpisodeController.deleteEntryById);
router.post('/season/:id', EpisodeController.createEpisode);
router.put('/:id', EpisodeController.updateEpisode);

module.exports = router;