const GenreModel = require("../model/genreModel");
const ControllerParent = require("../../api/controller/controllerParent");

class GenreController extends ControllerParent
{
    constructor()
    {
        super(GenreModel);

        ['createGenre', 'getMoviesByGenre', 'getSeriesByGenre'].forEach(
            method => this[method] = this[method].bind(this)
        );
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

    async createGenre(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { name, description } = req.body;

            if (!name || !description) return this.sendResponse(res, 400, "Name and description are required", null, isXml);

            const genre = await GenreModel.createGenre(name, description);

            this.sendResponse(res, 201, "Genre created successfully", genre, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async getMoviesByGenre(req, res) {
        const isXml = this.isXmlRequest(req);
        const genreId = req.params.id;

        try {
            const movies = await GenreModel.getMoviesByGenre(genreId);

            if (!movies) {
                return this.sendResponse(res, 404, "No movies found in this genre", null, isXml);
            }

            this.sendResponse(res, 200, "Movies in this genre", movies, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async getSeriesByGenre(req, res) {
        const isXml = this.isXmlRequest(req);
        const genreId = req.params.id;

        try {
            const series = await GenreModel.getSeriesByGenre(genreId);

            if (!series) {
                return this.sendResponse(res, 404, "No series found in this genre", null, isXml);
            }

            this.sendResponse(res, 200, "Series in this genre", series, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new GenreController();
module.exports = controller;