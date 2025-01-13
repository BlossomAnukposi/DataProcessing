const ProfileModel = require("../model/profileModel");
const ControllerParent = require("../../api/controller/controllerParent");
const axios = require("axios"); // For fetching cat picture

class ProfileController extends ControllerParent {
    constructor() {
        super(ProfileModel);

        ['createProfile', 'getProfilesByAccount', 'updateProfile'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    async getAllEntries(req, res, method) {
        await super.getAllEntries(req, res, 'getAllProfilesQuery');
    }

    async getEntryById(req, res, method) {
        await super.getEntryById(req, res, 'getProfileByIdQuery');
    }

    async deleteEntryById(req, res, method) {
        await super.deleteEntryById(req, res, 'deleteProfileByIdQuery');
    }

    async createProfile(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { accountId, profileName, dateOfBirth, profilePicture, profileLanguage } = req.body;
            const acceptedLanguages = ['English', 'Dutch', 'Pitjantjatjara'];

            if (profileLanguage && !acceptedLanguages.includes(profileLanguage)) {
                return this.sendResponse(res, 400, "Only English, Dutch, Pitjantjatjara are available", null, isXml);
            }

            let finalProfilePicture = profilePicture;

            // Fetch a default cat picture from The Cat API if profilePicture is not provided
            if (!profilePicture) {
                try {
                    const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
                        headers: { "x-api-key": "live_fAcL0MnEqplr0mqiRuDbVJ7Dmncl0cyIXz0sBuYPVPkU0AS4HQOD2eDUyN7KygK5" }
                    });
                    finalProfilePicture = response.data[0].url;
                } catch (error) {
                    console.error("Error fetching cat picture. Falling back to default image.", error.message);
                    finalProfilePicture = "https://example.com/default-cat-picture.jpg"; // Hardcoded fallback
                }
            }

            const profile = await ProfileModel.createProfile(
                accountId,
                profileName,
                dateOfBirth,
                finalProfilePicture,
                profileLanguage || "English"
            );

            this.sendResponse(res, 201, "Profile created successfully", profile, isXml);
        } catch (error) {
            this.handleError(error, res, isXml);
        }
    }

    async getProfilesByAccount(req, res) {
        const isXml = this.isXmlRequest(req);
        const accountId = req.params.id;

        try {
            const profile = await ProfileModel.getProfilesByAccount(accountId);

            if (!profile) {
                return this.sendResponse(res, 404, "Profile not found", null, isXml);
            }

            this.sendResponse(res, 200, "Profile found", profile, isXml);
        } catch (error) {
            this.handleError(error, res, isXml);
        }
    }

    async updateProfile(req, res) {
        const isXml = this.isXmlRequest(req);
        const profileId = req.params.id;
        const acceptedLanguages = ['English', 'Dutch', 'Pitjantjatjara'];

        try {
            const { profileName, dateOfBirth, profilePicture, profileLanguage } = req.body;

            if (profileLanguage && !acceptedLanguages.includes(profileLanguage)) {
                return this.sendResponse(res, 400, "Only English, Dutch, Pitjantjatjara are available", null, isXml);
            }

            if (!profileName && !dateOfBirth && !profilePicture && !profileLanguage) {
                return this.sendResponse(res, 400, "At least one field must be provided", null, isXml);
            }

            const updatedProfile = await ProfileModel.updateProfile(
                profileId,
                profileName,
                dateOfBirth,
                profilePicture,
                profileLanguage
            );

            if (!updatedProfile) {
                return this.sendResponse(res, 404, "Profile not found", null, isXml);
            }

            this.sendResponse(res, 200, "Profile updated successfully", updatedProfile, isXml);
        } catch (error) {
            this.handleError(error, res, isXml);
        }
    }
}

module.exports = new ProfileController();
