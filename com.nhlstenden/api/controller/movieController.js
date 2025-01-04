const movieModel = require("../model/movieModel");
const ControllerParent = require("../../api/controller/controllerParent");

class MovieController extends ControllerParent
{
    constructor()
    {
        super(movieModel);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllMoviesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getMovieByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteMovieByIdQuery');
    }
}

const controller = new MovieController();
module.exports = controller;