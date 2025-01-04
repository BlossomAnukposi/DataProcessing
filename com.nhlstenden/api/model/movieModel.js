const database = require("../../config/database");
const ModelParent = require("./modelParent");

class MovieModel extends ModelParent
{
    constructor()
    {
        super("movie");
    }
}

module.exports = new MovieModel();