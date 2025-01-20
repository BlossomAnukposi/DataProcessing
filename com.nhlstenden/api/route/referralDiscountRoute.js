const express = require('express');
const ReferralDiscountController = require('../controller/referralDiscountController');

class ReferralDiscountRoute {
    constructor() {
        this.router = express.Router();
        this.referralDiscountController = ReferralDiscountController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/status", this.referralDiscountController.getAllReferralStatuses.bind(this.referralDiscountController));
        this.router.get("/", this.referralDiscountController.getAllEntries.bind(this.referralDiscountController));
        this.router.get("/:id", this.referralDiscountController.getEntryById.bind(this.referralDiscountController));
        this.router.delete("/:id", this.referralDiscountController.deleteEntryById.bind(this.referralDiscountController));
        this.router.post("/", this.referralDiscountController.createReferralDiscount.bind(this.referralDiscountController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ReferralDiscountRoute().getRouter();

/**
 * @swagger
 * /referralDiscount/status:
 *   get:
 *     tags:
 *       - Referral Discount
 *     summary: Get all referral discount statuses
 *     description: Fetches all available statuses for referral discounts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all referral discount statuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Status of the referral discount.
 *       404:
 *         description: No statuses found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /referralDiscount:
 *   get:
 *     tags:
 *       - Referral Discount
 *     summary: Get all referral discounts
 *     description: Fetches all referral discounts from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all referral discounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReferralDiscount'
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /referralDiscount/{id}:
 *   get:
 *     tags:
 *       - Referral Discount
 *     summary: Get a referral discount by ID
 *     description: Fetches a specific referral discount using its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Referral discount ID
 *     responses:
 *       200:
 *         description: The requested referral discount.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReferralDiscount'
 *       404:
 *         description: Referral discount not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /referralDiscount/{id}:
 *   delete:
 *     tags:
 *       - Referral Discount
 *     summary: Delete a referral discount
 *     description: Deletes a specific referral discount by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Referral discount ID
 *     responses:
 *       200:
 *         description: Referral discount deleted successfully.
 *       404:
 *         description: Referral discount not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /referralDiscount:
 *   post:
 *     tags:
 *       - Referral Discount
 *     summary: Create a new referral discount
 *     description: Creates a new referral discount with the given account ID, referral link, and number of uses.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: integer
 *                 description: ID of the associated account (required).
 *               numberOfReferralUses:
 *                 type: integer
 *                 description: Initial number of referral uses (required).
 *               referralLink:
 *                 type: string
 *                 description: Unique referral link (required).
 *     responses:
 *       201:
 *         description: Referral discount created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReferralDiscount'
 *       400:
 *         description: Invalid input. All fields are required.
 *       500:
 *         description: Server error.
 */
