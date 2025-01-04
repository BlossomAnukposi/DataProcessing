const genreModel = require("../model/genreModel");
const ControllerParent = require("../../api/controller/controllerParent");

class GenreController extends ControllerParent
{
    constructor()
    {
        super(genreModel);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllGenresQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getGenreByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteGenreByIdQuery');
    }
}

const controller = new GenreController();
module.exports = controller;