const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/', movieController.getAllEntries);
router.get('/:id', movieController.getEntryById);
// router.delete('/:account_id', movieController.deleteEntry);
// router.get('/:id', movieController.getEpisodesBySeason);
// router.post('/', movieController.create_episode);
// router.put('/:account_id', movieController.update_episode);

module.exports = router;