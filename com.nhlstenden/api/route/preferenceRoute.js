const express = require('express');
const router = express.Router();
const preferenceController = require('../controller/preferenceController');

router.get('/', preferenceController.getAllEntries);
router.get('/:id', preferenceController.getEntryById);
// router.delete('/:account_id', preferenceController.deleteEntry);
// router.get('/:id', preferenceController.getEpisodesBySeason);
// router.post('/', preferenceController.create_episode);
// router.put('/:account_id', preferenceController.update_episode);

module.exports = router;