const profileModel = require("../model/profileModel");
const ControllerParent = require("../../api/controller/controllerParent");

class ProfileController extends ControllerParent
{
    constructor()
    {
        super(profileModel);
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
}

module.exports = new ProfileController();