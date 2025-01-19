const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controller/subscriptionController");

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get all subscriptions
 *     description: Retrieves all subscriptions from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all subscriptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Server error.
 */
router.get('/', SubscriptionController.getAllEntries);

/**
 * @swagger
 * /subscriptions/account:
 *   get:
 *     tags:
 *       - Subscription
 *       - Account
 *     summary: Get subscriptions by account
 *     description: Retrieves subscriptions associated with a specific account.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of subscriptions for the account.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccountSubscription'
 *       404:
 *         description: No subscriptions found for the account.
 *       500:
 *         description: Server error.
 */
router.get('/account', SubscriptionController.getAccountSubscriptions);

/**
 * @swagger
 * /subscriptions/active:
 *   get:
 *     tags:
 *       - Subscription
 *       - Account
 *     summary: Get active subscriptions
 *     description: Retrieves active subscriptions from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of active subscriptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: No active subscriptions found.
 *       500:
 *         description: Server error.
 */
router.get('/active', SubscriptionController.getActiveSubscriptions);

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get a subscription by ID
 *     description: Retrieves a specific subscription based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The subscription details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', SubscriptionController.getEntryById);

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Delete a subscription by ID
 *     description: Deletes a specific subscription based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subscription deleted successfully.
 *       404:
 *         description: Subscription not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', SubscriptionController.deleteEntryById);

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Create a new subscription
 *     description: Creates a new subscription with the provided details.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionPrice:
 *                 type: number
 *                 format: double
 *               subscriptionType:
 *                 type: string
 *             required:
 *               - subscriptionPrice
 *               - subscriptionType
 *     responses:
 *       200:
 *         description: Subscription created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post('/', SubscriptionController.createSubscription);

/**
 * @swagger
 * /subscriptions/{id}:
 *   patch:
 *     tags:
 *       - Subscription
 *     summary: Update an existing subscription
 *     description: Updates a subscription with the given details.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionPrice:
 *                 type: number
 *                 format: double
 *               subscriptionType:
 *                 type: string
 *             required:
 *               - subscriptionPrice
 *               - subscriptionType
 *     responses:
 *       200:
 *         description: Subscription updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: At least one field must be provided to update.
 *       404:
 *         description: Subscription not found.
 *       500:
 *         description: Server error.
 */
router.patch('/:id', SubscriptionController.updateSubscription);

module.exports = router;