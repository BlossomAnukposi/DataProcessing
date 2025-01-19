const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/profileController');

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get all profiles
 *     description: Fetches all profiles from the database.
 *     security:
 *       - BearerAuth: []
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
router.get('/', ProfileController.getAllEntries);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get profile by ID
 *     description: Fetches a specific profile by its ID.
 *     security:
 *       - BearerAuth: []
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
router.get('/:id', ProfileController.getEntryById);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete a profile
 *     description: Deletes a specific profile by its ID.
 *     security:
 *       - BearerAuth: []
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
router.delete('/:id', ProfileController.deleteEntryById);

/**
 * @swagger
 * /profiles/account/{id}:
 *   get:
 *     tags:
 *       - Profile
 *       - Account
 *     summary: Get profiles by account
 *     description: Fetches all profiles associated with a specific account ID.
 *     security:
 *       - BearerAuth: []
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
router.get('/account/:id', ProfileController.getProfilesByAccount);

/**
 * @swagger
 * /profiles:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Create a new profile
 *     description: Creates a new profile. If no `profilePicture` is provided, a default cat picture is used.
 *     security:
 *       - BearerAuth: []
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
router.post('/', ProfileController.createProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update a profile
 *     description: Updates details of an existing profile by its ID.
 *     security:
 *       - BearerAuth: []
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
router.put('/:id', ProfileController.updateProfile);

module.exports = router;