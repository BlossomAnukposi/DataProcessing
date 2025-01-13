const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/profileController');

router.get('/', ProfileController.getAllEntries);
router.get('/:id', ProfileController.getEntryById);
router.delete('/:id', ProfileController.deleteEntryById);
router.get('/account/:id', ProfileController.getProfilesByAccount);
router.post('/', ProfileController.createProfile);
router.put('/:id', ProfileController.updateProfile);

// profile preferences
// profile watchlist
// profile watching

module.exports = router;