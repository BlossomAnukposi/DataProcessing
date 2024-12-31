const profileModel = require("../model/profileModel");
const controllerParent = require("../../api/controller/controllerParent");

class profileController extends controllerParent
{
    constructor()
    {
        super(profileModel);

        this.getAllEntries = this.getAllEntries.bind(this);
        this.getEntryById = this.getEntryById.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllProfilesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getProfileByIdQuery');
    }
}

module.exports = new profileController();