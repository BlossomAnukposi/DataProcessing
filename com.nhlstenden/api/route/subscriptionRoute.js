const express = require("express");
const SubscriptionController = require("../controller/subscriptionController");

class SubscriptionRoute {
    constructor() {
        this.router = express.Router();
        this.subscriptionController = SubscriptionController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.subscriptionController.getAllEntries.bind(this.subscriptionController));
        this.router.get("/account", this.subscriptionController.getAccountSubscriptions.bind(this.subscriptionController));
        this.router.get("/active", this.subscriptionController.getActiveSubscriptions.bind(this.subscriptionController));
        this.router.get("/:id", this.subscriptionController.getEntryById.bind(this.subscriptionController));
        this.router.delete("/:id", this.subscriptionController.deleteEntryById.bind(this.subscriptionController));
        this.router.post("/", this.subscriptionController.createSubscription.bind(this.subscriptionController));
        this.router.put("/:id", this.subscriptionController.updateSubscription.bind(this.subscriptionController));
    }

    //get subscription for account

    getRouter() {
        return this.router;
    }
}

module.exports = new SubscriptionRoute().getRouter();

//SUBSCRIPTION DOCUMENTATION
/**
 * @swagger
 * /subscription:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get all subscriptions
 *     description: Retrieves all subscriptions from the database.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription/account:
 *   get:
 *     tags:
 *       - Subscription
 *       - Account
 *     summary: Get subscriptions by account
 *     description: Retrieves subscriptions associated with a specific account.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription/active:
 *   get:
 *     tags:
 *       - Subscription
 *       - Account
 *     summary: Get active subscriptions
 *     description: Retrieves active subscriptions from the database.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription/{id}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Get a subscription by ID
 *     description: Retrieves a specific subscription based on its ID.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription/{id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Delete a subscription by ID
 *     description: Deletes a specific subscription based on its ID.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Create a new subscription
 *     description: Creates a new subscription with the provided details.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /subscription/{id}:
 *   patch:
 *     tags:
 *       - Subscription
 *     summary: Update an existing subscription
 *     description: Updates a subscription with the given details.
 *     security:
 *       - bearerAuth: []
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
