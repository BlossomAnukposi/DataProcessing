const express = require('express');
const router = express.Router();
const ReferralDiscountController = require('../controller/referralDiscountController');

router.get('/', ReferralDiscountController.getAllEntries);
router.get('/:id', ReferralDiscountController.getEntryById);
router.delete('/:id', ReferralDiscountController.deleteEntryById);
// router.get('/:id', ReferralDiscountController.getEpisodesBySeason);
// router.post('/', ReferralDiscountController.create_episode);
// router.put('/:id', ReferralDiscountController.update_episode);

module.exports = router;