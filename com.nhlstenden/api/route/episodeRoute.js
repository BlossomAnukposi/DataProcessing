const express = require('express');
const router = express.Router();
const episodeController = require('../controller/episodeController');

router.get('/', episodeController.getAllEntries);
router.get('/:id', episodeController.getEntryById);
router.delete('/:account_id', episodeController.deleteEntry);
router.get('/:id', episodeController.getEpisodesBySeason);
// router.post('/', episode_controller.create_episode);
// router.put('/:account_id', episode_controller.update_episode);

module.exports = router;