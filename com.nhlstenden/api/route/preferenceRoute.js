const express = require('express');
const router = express.Router();
const PreferenceController = require('../controller/preferenceController');

router.get('/', PreferenceController.getAllEntries);
router.get('/:id', PreferenceController.getEntryById);
router.delete('/:id', PreferenceController.deleteEntryById);
router.get('/profile/:id', PreferenceController.getPreferencesByProfile);
router.post('/', PreferenceController.createPreference);

module.exports = router;