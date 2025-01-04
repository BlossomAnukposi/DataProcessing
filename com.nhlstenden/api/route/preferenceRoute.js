const express = require('express');
const router = express.Router();
const PreferenceController = require('../controller/preferenceController');

router.get('/', PreferenceController.getAllEntries);
router.get('/:id', PreferenceController.getEntryById);
router.delete('/:id', PreferenceController.deleteEntryById);
// router.get('/:id', PreferenceController.getEpisodesBySeason);
// router.post('/', PreferenceController.create_episode);
// router.put('/:id', PreferenceController.update_episode);

module.exports = router;