const preferenceModel = require("../model/preferenceModel");
const controllerParent = require("../../api/controller/controllerParent");

class preferenceController extends controllerParent
{
    constructor()
    {
        super(preferenceModel);

        this.getAllEntries = this.getAllEntries.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllPreferencesQuery');
    }
}

module.exports = new preferenceController();