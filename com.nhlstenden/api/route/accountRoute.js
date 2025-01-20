const express = require("express");
const AccountController = require("../controller/accountController");
const AuthMiddleware = require("../../middleware/authMiddleware");

class AccountRoute {
    constructor() {
        this.router = express.Router();
        this.accountController = AccountController;
        this.authMiddleware = AuthMiddleware;
        this.initializeRoutes();
    }

    initializeRoutes() {
        //PUBLIC ROUTES
        this.router.post("/signIn", this.accountController.signIn.bind(this.accountController));
        this.router.post("/", this.accountController.createAccount.bind(this.accountController));

        //PROTECTED ROUTES
        this.router.get("/", this.authMiddleware.authenticateToken, this.accountController.getAllEntries.bind(this.accountController));
        this.router.get("/:id", this.authMiddleware.authenticateToken, this.accountController.getEntryById.bind(this.accountController));
        this.router.delete("/:id", this.authMiddleware.authenticateToken, this.accountController.deleteEntryById.bind(this.accountController));
        this.router.put("/:id", this.authMiddleware.authenticateToken, this.accountController.updateAccount.bind(this.accountController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AccountRoute().getRouter();

//ALL SCHEMAS
/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operations related to authenticating users
 *   - name: Account
 *     description: Operations related to user accounts
 *   - name: Episode
 *     description: Operations related to episodes
 *   - name: Genre
 *     description: Operations related to genres
 *   - name: Movie
 *     description: Operations related to movies
 *   - name: Preference
 *     description: Operations related to preferences
 *   - name: Profile
 *     description: Operations related to profiles
 *   - name: Referral Discount
 *     description: Operations related to referral discounts
 *   - name: Season
 *     description: Operations related to seasons
 *   - name: Series
 *     description: Operations related to series
 *   - name: Subscription
 *     description: Operations related to subscriptions
 *   - name: Subtitle
 *     description: Operations related to subtitles
 *   - name: Watched Media List
 *     description: Operations related to watched media list
 *   - name: Watchlist
 *     description: Operations related to the watchlist
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *   - bearerAuth: []
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *           description: Unique ID for the profile.
 *         account_id:
 *           type: integer
 *           description: The ID of the associated account.
 *         profile_name:
 *           type: string
 *           description: Name of the profile.
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: Date of birth of the profile.
 *         profile_picture:
 *           type: string
 *           description: URL of the profile picture.
 *         profile_language:
 *           type: string
 *           description: Language preference for the profile.
 *     Account:
 *       type: object
 *       properties:
 *         account_id:
 *           type: integer
 *           description: Unique ID for the account.
 *         email:
 *           type: string
 *           format: email
 *           description: Email associated with the account.
 *         password:
 *           type: string
 *           format: password
 *           description: Hashed password for the account.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the account was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the account was last updated.

 *     Preference:
 *       type: object
 *       properties:
 *         preference_id:
 *           type: integer
 *           description: Unique ID for the preference.
 *         profile_id:
 *           type: integer
 *           description: The ID of the associated profile.
 *         movie_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the preferred movie, if applicable.
 *         series_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the preferred series, if applicable.
 *         age_classification:
 *           type: integer
 *           nullable: true
 *           description: Age classification preference.
 *         genre:
 *           type: integer
 *           nullable: true
 *           description: Genre preference.
 *     Movie:
 *       type: object
 *       properties:
 *         movie_id:
 *           type: integer
 *           description: Unique ID for the movie.
 *         age_classification:
 *           type: integer
 *           description: Age classification for the movie.
 *         genre:
 *           type: integer
 *           description: Genre ID of the movie.
 *         quality_type:
 *           type: string
 *           enum:
 *             - HD
 *             - UHD
 *             - SD
 *           description: Quality type of the movie (HD, UHD, SD).
 *         title:
 *           type: string
 *           description: Title of the movie.
 *         duration:
 *           type: string
 *           description: Duration of the movie in interval format.
 *         description:
 *           type: string
 *           description: Description of the movie.
 *         view_count:
 *           type: integer
 *           description: Number of times the movie has been viewed.
 *         movie_link:
 *           type: string
 *           description: URL of the movie link.
 *     Genre:
 *       type: object
 *       properties:
 *         genre_id:
 *           type: integer
 *           description: Unique ID for the genre.
 *         name:
 *           type: string
 *           description: Name of the genre.
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the genre.
 *     Episode:
 *       type: object
 *       properties:
 *         episode_id:
 *           type: integer
 *           description: Unique ID for the episode.
 *         series_id:
 *           type: integer
 *           description: ID of the series to which the episode belongs.
 *         title:
 *           type: string
 *           description: Title of the episode.
 *         duration:
 *           type: string
 *           description: Duration of the episode in interval format.
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the episode.
 *         view_count:
 *           type: integer
 *           description: Number of times the episode has been viewed.
 *         episode_number:
 *           type: integer
 *           description: The number of the episode within its season.
 *         season_number:
 *           type: integer
 *           description: The season number of the episode.
 *     Referral discount:
 *       type: object
 *       properties:
 *         referral_discount_id:
 *           type: integer
 *           description: Unique ID for the referral discount.
 *         account_id:
 *           type: integer
 *           description: ID of the account associated with the referral discount.
 *         number_of_referral_uses:
 *           type: integer
 *           description: Number of times the referral link has been used.
 *         referral_link:
 *           type: string
 *           description: Unique referral link associated with the discount.
 *     Season:
 *      type: object
 *      properties:
 *        season_id:
 *          type: integer
 *          description: Unique identifier for each season.
 *          example: 1
 *        series_id:
 *          type: integer
 *          description: Identifier for the series this season belongs to.
 *          example: 1
 *        season_number:
 *          type: integer
 *          description: The number of the season (e.g., 1 for Season 1).
 *          example: 1
 *        season_url:
 *          type: string
 *          description: The URL related to the season.
 *          example: "https://example.com/season1"
 *      required:
 *        - series_id
 *        - season_number
 *        - season_url
 *     Subscription:
 *       type: object
 *       properties:
 *         subscription_id:
 *           type: integer
 *         subscription_price:
 *           type: number
 *           format: double
 *         subscription_type:
 *           type: string
 *       required:
 *         - subscription_id
 *         - subscription_price
 *         - subscription_type
 *
 *     AccountSubscription:
 *       type: object
 *       properties:
 *         account_subscription_id:
 *           type: integer
 *         account_id:
 *           type: integer
 *         subscription_id:
 *           type: integer
 *         subscription_purchase_date:
 *           type: string
 *           format: date
 *         expiry_date:
 *           type: string
 *           format: date
 *       required:
 *         - account_subscription_id
 *         - account_id
 *         - subscription_id
 *         - subscription_purchase_date
 *         - expiry_date
 *     Subtitle:
 *       type: object
 *       properties:
 *         subtitle_id:
 *           type: integer
 *         episode_id:
 *           type: integer
 *         movie_id:
 *           type: integer
 *         language:
 *           type: string
 *         content:
 *           type: string
 *       required:
 *         - subtitle_id
 *         - language
 *         - content
 *         - movie_id
 *         - episode_id
 *     WatchedMediaList:
 *       type: object
 *       properties:
 *         watched_media_list_id:
 *           type: integer
 *         movie_id:
 *           type: integer
 *         episode_id:
 *           type: integer
 *         profile_id:
 *           type: integer
 *         subtitle_id:
 *           type: integer
 *         view_count:
 *           type: integer
 *         time_left_at:
 *           type: string
 *           format: duration
 *       required:
 *         - watched_media_list_id
 *         - profile_id
 *         - movie_id
 *         - episode_id
 *         - view_count
 *         - time_left_at
 *     Watchlist:
 *       type: object
 *       properties:
 *         watchlist_id:
 *           type: integer
 *           description: The unique ID of the watchlist entry.
 *         profile_id:
 *           type: integer
 *           description: The ID of the profile that owns the watchlist entry.
 *         movie_id:
 *           type: integer
 *           description: The ID of the movie in the watchlist.
 *         series_id:
 *           type: integer
 *           description: The ID of the series in the watchlist.
 *       required:
 *         - profile_id
 */

//ACCOUNT DOCUMENTATION
/**
 * @swagger
 * /account/signIn:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in a user and get a token
 *     description: PUBLIC ROUTE - Authenticates the user using email and password, and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in, returns user data and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     account_id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     account_status:
 *                       type: string
 *                     join_date:
 *                       type: string
 *                     login_attempts:
 *                       type: integer
 *                     invited_by_account_id:
 *                       type: integer
 *                 token:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request (missing email or password)
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /account:
 *   post:
 *     tags:
 *       - Account
 *     summary: Create a new user account
 *     description: PUBLIC ROUTE - Creates a new user account with the provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               invitedByAccountId:
 *                 type: integer
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               invitedByAccountId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully created user account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *       400:
 *         description: Invalid input (missing email or password)
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /account:
 *   get:
 *     tags:
 *       - Account
 *     summary: Get all user accounts
 *     description: Fetches all user accounts from the database (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   account_id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   account_status:
 *                     type: string
 *                   join_date:
 *                     type: string
 *                   login_attempts:
 *                     type: integer
 *                   invited_by_account_id:
 *                     type: integer
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   account_id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   account_status:
 *                     type: string
 *                   join_date:
 *                     type: string
 *                   login_attempts:
 *                     type: integer
 *                   invited_by_account_id:
 *                     type: integer
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /account/{id}:
 *   get:
 *     tags:
 *       - Account
 *     summary: Get a user account by ID
 *     description: Fetches a specific user account by its ID (requires authentication)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User account ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *                 login_attempts:
 *                   type: integer
 *                 invited_by_account_id:
 *                   type: integer
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *                 login_attempts:
 *                   type: integer
 *                 invited_by_account_id:
 *                   type: integer
 *       401:
 *         description: Unauthorized (invalid token)
 *       404:
 *         description: User account not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /account/{id}:
 *   delete:
 *     tags:
 *       - Account
 *     summary: Delete a user account by ID
 *     description: Deletes a specific user account by its ID (requires authentication)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User account ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted user account
 *       401:
 *         description: Unauthorized (invalid token)
 *       404:
 *         description: User account not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /account/{id}:
 *   patch:
 *     tags:
 *       - Account
 *     summary: Update a user account by ID
 *     description: Updates the details of a user account (requires authentication)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User account ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               account_status:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               account_status:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated user account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 account_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 account_status:
 *                   type: string
 *                 join_date:
 *                   type: string
 *       400:
 *         description: Bad request (invalid input or status)
 *       401:
 *         description: Unauthorized (invalid token)
 *       404:
 *         description: User account not found
 *       500:
 *         description: Server error
 */
