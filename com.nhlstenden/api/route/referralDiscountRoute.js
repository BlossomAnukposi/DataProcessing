const express = require('express');
const router = express.Router();
const referralDiscountController = require('../controller/referralDiscountController');

router.get('/', referralDiscountController.getAllEntries);
router.get('/:id', referralDiscountController.getEntryById);
// router.delete('/:account_id', referralDiscountController.deleteEntry);
// router.get('/:id', referralDiscountController.getEpisodesBySeason);
// router.post('/', referralDiscountController.create_episode);
// router.put('/:account_id', referralDiscountController.update_episode);

module.exports = router;