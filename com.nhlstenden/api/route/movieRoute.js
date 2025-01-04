const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movieController');

router.get('/', MovieController.getAllEntries);
router.get('/:id', MovieController.getEntryById);
router.delete('/:id', MovieController.deleteEntryById);
// router.get('/:id', MovieController.getEpisodesBySeason);
// router.post('/', MovieController.create_episode);
// router.put('/:id', MovieController.update_episode);

module.exports = router;