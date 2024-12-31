const movieModel = require("../model/movieModel");
const controllerParent = require("../../api/controller/controllerParent");

class movieController extends controllerParent
{
    constructor()
    {
        super(movieModel);

        this.getAllEntries = this.getAllEntries.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllMoviesQuery');
    }
}

module.exports = new movieController();