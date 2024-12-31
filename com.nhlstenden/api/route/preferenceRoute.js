const express = require('express');
const router = express.Router();
const preferenceController = require('../controller/preferenceController');

router.get('/', preferenceController.getAllEntries);
// router.get('/:id', genreController.getEntryById);
// router.delete('/:account_id', genreController.deleteEntry);
// router.get('/:id', genreController.getEpisodesBySeason);
// router.post('/', episode_controller.create_episode);
// router.put('/:account_id', episode_controller.update_episode);

module.exports = router;