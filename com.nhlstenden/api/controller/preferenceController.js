const PreferenceModel = require("../model/preferenceModel");
const ControllerParent = require("../../api/controller/controllerParent");
const ProfileModel = require("../model/profileModel");

class PreferenceController extends ControllerParent {
    constructor() {
        super(PreferenceModel);

        ["createPreference", "getPreferencesByProfile"].forEach(
            (method) => (this[method] = this[method].bind(this))
        );
    }

    async getAllEntries(req, res, method) {
        await super.getAllEntries(req, res, "getAllPreferencesQuery");
    }

    async getEntryById(req, res, method) {
        await super.getEntryById(req, res, "getPreferenceByIdQuery");
    }

    async deleteEntryById(req, res, method) {
        await super.deleteEntryById(req, res, "deletePreferenceByIdQuery");
    }

    async createPreference(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { profileId, movieId, seriesId, ageClassification, genre } =
                req.body;

            // Input validation
            if (!profileId) {
                return this.sendResponse(res, 400, "Profile ID is required", null, isXml);
            }

            // Validate profile exists
            const profileExists = await ProfileModel.getEntryById(profileId, 'getProfileByIdQuery');
            if (!profileExists) {
                return this.sendResponse(res, 404, `Profile with ID ${profileId} not found`, null, isXml);
            }

            // Validate at least one preference
            if (!movieId && !seriesId && !ageClassification && !genre) {
                return this.sendResponse(res, 400, "At least one preference must be provided", null, isXml);
            }

            // Create preference
            const preference = await PreferenceModel.createPreference(profileId, movieId, seriesId, ageClassification, genre);

            this.sendResponse(res, 201, "Preference created successfully.", preference, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async getPreferencesByProfile(req, res) {
        const isXml = this.isXmlRequest(req);
        const profileId = req.params.id;

        try {
            const result = await PreferenceModel.getPreferencesByProfile(profileId);

            if (!result) {
                return this.sendResponse(res, 404, "No preferences found", null, isXml);
            }

            this.sendResponse(res, 200, "fetched preferences successfully", result, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }
}

module.exports = new PreferenceController();
