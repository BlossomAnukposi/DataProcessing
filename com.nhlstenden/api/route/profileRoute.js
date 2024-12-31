const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/', profileController.getAllEntries);
router.get('/:id', profileController.getEntryById);
// router.delete('/:account_id', profileController.deleteEntry);
// router.get('/:id', profileController.getEpisodesBySeason);
// router.post('/', profileController.create_episode);
// router.put('/:account_id', profileController.update_episode);

module.exports = router;