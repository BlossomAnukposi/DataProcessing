const database = require("../../config/database");
const ModelParent = require("./modelParent");

class GenreModel extends ModelParent
{
    constructor()
    {
        super("genre");
    }
}

module.exports = new GenreModel();