const genreModel = require("../model/genreModel");
const controllerParent = require("../../api/controller/controllerParent");

class genreController extends controllerParent
{
    constructor()
    {
        super(genreModel);

        this.getAllEntries = this.getAllEntries.bind(this);
        this.getEntryById = this.getEntryById.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllGenresQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getGenreByIdQuery');
    }
}

module.exports = new genreController();