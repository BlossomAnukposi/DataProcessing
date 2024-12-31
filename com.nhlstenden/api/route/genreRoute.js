const express = require('express');
const router = express.Router();
const genreController = require('../controller/genreController');

router.get('/', genreController.getAllEntries);
// router.get('/:id', genreController.getEntryById);
// router.delete('/:account_id', genreController.deleteEntry);
// router.get('/:id', genreController.getEpisodesBySeason);
// router.post('/', episode_controller.create_episode);
// router.put('/:account_id', episode_controller.update_episode);

module.exports = router;