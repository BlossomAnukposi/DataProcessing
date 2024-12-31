const database = require("../../config/database");
const modelParent = require("./modelParent");

class profileModel extends modelParent
{
    constructor()
    {
        super("profile");
    }
}

module.exports = new profileModel();