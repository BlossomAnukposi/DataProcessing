const database = require("../../config/database");
const ModelParent = require("./modelParent");

class PreferenceModel extends ModelParent
{
    constructor()
    {
        super("preference");
    }
}

module.exports = new PreferenceModel();