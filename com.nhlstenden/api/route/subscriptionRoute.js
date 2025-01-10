const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controller/subscriptionController");

router.get('/', SubscriptionController.getAllEntries);        // Get all subscriptions
router.get('/:id', SubscriptionController.getEntryById);     // Get subscription by ID
router.delete('/:id', SubscriptionController.deleteEntryById); // Delete subscription by ID
router.post('/', SubscriptionController.createSubscription);   // Create a new subscription
router.patch('/:id', SubscriptionController.updateSubscription); // Update subscription by ID

module.exports = router;
