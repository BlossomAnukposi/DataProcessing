const ProfileModel = require("../model/profileModel");
const AccountModel = require("../model/accountModel");
const ControllerParent = require("../../api/controller/controllerParent");

class ProfileController extends ControllerParent
{
    constructor()
    {
        super(ProfileModel);

        ['createProfile', 'getProfilesByAccount', 'updateProfile'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllProfilesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getProfileByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteProfileByIdQuery');
    }

    async createProfile(req, res) {
        const isXml = this.isXmlRequest(req);
    
        try {
            const {accountId, profileName, dateOfBirth, profilePicture, profileLanguage} = req.body;
            const acceptedLanguages = ['English', 'Dutch', 'Pitjantjatjara'];
    
            if (profileLanguage && !acceptedLanguages.includes(profileLanguage)) {
                return this.sendResponse(res, 400, "Only English, Dutch, Pitjantjara are available", null, isXml);
            }
    
            const profile = await ProfileModel.createProfile(accountId, profileName, dateOfBirth, profilePicture, profileLanguage);
    
            this.sendResponse(res, 201, "Profile created successfully", profile, isXml);
        } catch (error) {
            this.handleError(error, res, isXml);
        }
    }

    async getProfilesByAccount(req, res) {
        const isXml = this.isXmlRequest(req);
        const accountId = req.params.id;

        try {
            const account = await AccountModel.getEntryById(accountId, 'getAccountByIdQuery');
            if (!account) {
                return this.sendResponse(res, 404, "Account not found", null, isXml);
            }

            const profile = await ProfileModel.getProfilesByAccount(accountId);
            if (!profile) {
                return this.sendResponse(res, 404, "No Profiles for account", null, isXml);
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

            if (profileLanguage &&!acceptedLanguages.includes(profileLanguage)) {
                return this.sendResponse(res, 400, "Only English, Dutch, Pitjantjatjara are available", null, isXml);
            }

            if (!profileName &&!dateOfBirth &&!profilePicture &&!profileLanguage) return this.sendResponse(res, 400, "At least one field must be provided", null, isXml);

            const updatedProfile = await ProfileModel.updateProfile(profileId, profileName, dateOfBirth, profilePicture, profileLanguage);

            if (!updatedProfile) {
                return this.sendResponse(res, 404, "Profile not found", null, isXml);
            }

            this.sendResponse(res, 200, "Profile updated successfully", updatedProfile, isXml);
        }
        catch (error) {
            this.handleError(error, res, isXml);
        }
    }
}

module.exports = new ProfileController();