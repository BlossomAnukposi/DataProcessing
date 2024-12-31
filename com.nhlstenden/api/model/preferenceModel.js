const database = require("../../config/database");
const modelParent = require("./modelParent");

class preferenceModel extends modelParent
{
    constructor()
    {
        super("preference");
    }
}

module.exports = new preferenceModel();