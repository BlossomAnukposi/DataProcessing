const movieModel = require("../model/movieModel");
const controllerParent = require("../../api/controller/controllerParent");

class movieController extends controllerParent
{
    constructor()
    {
        super(movieModel);

        this.getAllEntries = this.getAllEntries.bind(this);
        this.getEntryById = this.getEntryById.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllMoviesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getMovieByIdQuery');
    }
}

module.exports = new movieController();