const GenreModel = require("../model/genreModel");
const ControllerParent = require("../../api/controller/controllerParent");

class GenreController extends ControllerParent
{
    constructor()
    {
        super(GenreModel);

        this.createGenre = this.createGenre.bind(this);
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
}

const controller = new GenreController();
module.exports = controller;