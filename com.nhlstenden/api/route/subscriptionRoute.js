const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controller/subscriptionController");

router.get('/', SubscriptionController.getAllEntries);
router.get('/active/', SubscriptionController.getActiveSubscriptions);
router.get('/:id', SubscriptionController.getEntryById);
router.delete('/:id', SubscriptionController.deleteEntryById);
router.post('/', SubscriptionController.createSubscription);
router.patch('/:id', SubscriptionController.updateSubscription);


// subscription accounts

module.exports = router;