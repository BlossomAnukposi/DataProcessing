const express = require('express');
const PreferenceController = require('../controller/preferenceController');

class PreferenceRoute {
    constructor() {
        this.router = express.Router();
        this.preferenceController = PreferenceController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.preferenceController.getAllEntries.bind(this.preferenceController));
        this.router.get("/:id", this.preferenceController.getEntryById.bind(this.preferenceController));
        this.router.get("/profile/:id", this.preferenceController.getPreferencesByProfile.bind(this.preferenceController));
        this.router.delete("/:id", this.preferenceController.deleteEntryById.bind(this.preferenceController));
        this.router.post("/", this.preferenceController.createPreference.bind(this.preferenceController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PreferenceRoute().getRouter();

//PREFERENCE DOCUMENTATION
/**
 * @swagger
 * /preference:
 *   get:
 *     tags:
 *       - Preference
 *     summary: Get all preferences
 *     description: Fetches all preferences from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all preferences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   preference_id:
 *                     type: integer
 *                   profile_id:
 *                     type: integer
 *                   movie_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   age_classification:
 *                     type: integer
 *                   genre:
 *                     type: integer
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   preference_id:
 *                     type: integer
 *                   profile_id:
 *                     type: integer
 *                   movie_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   age_classification:
 *                     type: integer
 *                   genre:
 *                     type: integer
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /preference/{id}:
 *   get:
 *     tags:
 *       - Preference
 *     summary: Get preference by ID
 *     description: Fetches a specific preference by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Preference ID
 *     responses:
 *       200:
 *         description: The requested preference.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preference_id:
 *                   type: integer
 *                 profile_id:
 *                   type: integer
 *                 movie_id:
 *                   type: integer
 *                 series_id:
 *                   type: integer
 *                 age_classification:
 *                   type: integer
 *                 genre:
 *                   type: integer
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 preference_id:
 *                   type: integer
 *                 profile_id:
 *                   type: integer
 *                 movie_id:
 *                   type: integer
 *                 series_id:
 *                   type: integer
 *                 age_classification:
 *                   type: integer
 *                 genre:
 *                   type: integer
 *       404:
 *         description: Preference not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /preference/{id}:
 *   delete:
 *     tags:
 *       - Preference
 *     summary: Delete a preference
 *     description: Deletes a specific preference by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Preference ID
 *     responses:
 *       200:
 *         description: Preference deleted successfully.
 *       404:
 *         description: Preference not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /preference/profile/{id}:
 *   get:
 *     tags:
 *       - Preference
 *       - Profile
 *     summary: Get preferences by profile
 *     description: Fetches preferences associated with a specific profile ID.
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
 *         description: Preferences for the given profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   preference_id:
 *                     type: integer
 *                   profile_id:
 *                     type: integer
 *                   movie_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   age_classification:
 *                     type: integer
 *                   genre:
 *                     type: integer
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   preference_id:
 *                     type: integer
 *                   profile_id:
 *                     type: integer
 *                   movie_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   age_classification:
 *                     type: integer
 *                   genre:
 *                     type: integer
 *       404:
 *         description: No preferences found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /preference:
 *   post:
 *     tags:
 *       - Preference
 *     summary: Create a new preference
 *     description: Adds a new preference to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: integer
 *                 description: Profile ID (required).
 *               movieId:
 *                 type: integer
 *                 description: Optional Movie ID.
 *               seriesId:
 *                 type: integer
 *                 description: Optional Series ID.
 *               ageClassification:
 *                 type: integer
 *                 description: Optional age classification.
 *               genre:
 *                 type: integer
 *                 description: Optional genre ID.
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: integer
 *               movieId:
 *                 type: integer
 *               seriesId:
 *                 type: integer
 *               ageClassification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Preference created successfully.
 *       400:
 *         description: Missing required fields or invalid input.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Server error.
 */
