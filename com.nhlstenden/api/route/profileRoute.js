const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/profileController');

router.get('/', ProfileController.getAllEntries);
router.get('/:id', ProfileController.getEntryById);
router.delete('/:id', ProfileController.deleteEntryById);
// router.get('/:id', ProfileController.getEpisodesBySeason);
// router.post('/', ProfileController.create_episode);
// router.put('/:id', ProfileController.update_episode);

module.exports = router;