const database = require("../../config/database");
const ModelParent = require("./modelParent");

class ProfileModel extends ModelParent
{
    constructor()
    {
        super("profile");
    }
}

module.exports = new ProfileModel();