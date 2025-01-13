const express = require('express');
const router = express.Router();
const ReferralDiscountController = require('../controller/referralDiscountController');

router.get('/', ReferralDiscountController.getAllEntries);
router.get('/:id', ReferralDiscountController.getEntryById);
router.delete('/:id', ReferralDiscountController.deleteEntryById);
router.post('/', ReferralDiscountController.createReferralDiscount);

module.exports = router;