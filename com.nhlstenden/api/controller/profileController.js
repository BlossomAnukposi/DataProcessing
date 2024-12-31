const profileModel = require("../model/profileModel");
const controllerParent = require("../../api/controller/controllerParent");

class profileController extends controllerParent
{
    constructor()
    {
        super(profileModel);

        this.getAllEntries = this.getAllEntries.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllProfilesQuery');
    }
}

module.exports = new profileController();