const database = require("../../config/database");
const modelParent = require("./modelParent");

class movieModel extends modelParent
{
    constructor()
    {
        super("movie");
    }
}

module.exports = new movieModel();