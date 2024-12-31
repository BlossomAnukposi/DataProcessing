const database = require("../../config/database");
const modelParent = require("./modelParent");

class genreModel extends modelParent
{
    constructor()
    {
        super("genre");
    }
}

module.exports = new genreModel();