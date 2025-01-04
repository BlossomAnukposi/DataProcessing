const preferenceModel = require("../model/preferenceModel");
const ControllerParent = require("../../api/controller/controllerParent");

class PreferenceController extends ControllerParent
{
    constructor()
    {
        super(preferenceModel);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllPreferencesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getPreferenceByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deletePreferenceByIdQuery');
    }
}

module.exports = new PreferenceController();