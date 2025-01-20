const express = require('express');
const ProfileController = require('../controller/profileController');

class ProfileRoute {
    constructor() {
        this.router = express.Router();
        this.profileController = ProfileController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.profileController.getAllEntries.bind(this.profileController));
        this.router.get("/:id", this.profileController.getEntryById.bind(this.profileController));
        this.router.get("/account/:id", this.profileController.getProfilesByAccount.bind(this.profileController));
        this.router.delete("/:id", this.profileController.deleteEntryById.bind(this.profileController));
        this.router.post("/", this.profileController.createProfile.bind(this.profileController));
        this.router.put("/:id", this.profileController.updateProfile.bind(this.profileController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ProfileRoute().getRouter();

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get all profiles
 *     description: Fetches all profiles from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get profile by ID
 *     description: Fetches a specific profile by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: The requested profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete a profile
 *     description: Deletes a specific profile by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /profile/account/{id}:
 *   get:
 *     tags:
 *       - Profile
 *       - Account
 *     summary: Get profiles by account
 *     description: Fetches all profiles associated with a specific account ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Profiles for the given account.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Account or profiles not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /profile:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Create a new profile
 *     description: Creates a new profile. If no `profilePicture` is provided, a default cat picture is used.
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
 *                 description: The ID of the associated account (required).
 *               profileName:
 *                 type: string
 *                 description: Name of the profile (required).
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the profile (optional).
 *               profilePicture:
 *                 type: string
 *                 description: URL of the profile picture (optional).
 *               profileLanguage:
 *                 type: string
 *                 enum:
 *                   - English
 *                   - Dutch
 *                   - Pitjantjatjara
 *                 description: Language preference for the profile (optional).
 *     responses:
 *       201:
 *         description: Profile created successfully.
 *       400:
 *         description: Invalid input or unsupported language.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update a profile
 *     description: Updates details of an existing profile by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileName:
 *                 type: string
 *                 description: New name for the profile (optional).
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: New date of birth (optional).
 *               profilePicture:
 *                 type: string
 *                 description: New profile picture URL (optional).
 *               profileLanguage:
 *                 type: string
 *                 enum:
 *                   - English
 *                   - Dutch
 *                   - Pitjantjatjara
 *                 description: New language preference (optional).
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Server error.
 */
