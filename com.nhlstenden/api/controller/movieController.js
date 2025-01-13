const MovieModel = require("../model/movieModel");
const ControllerParent = require("../../api/controller/controllerParent");

class MovieController extends ControllerParent
{
    constructor()
    {
        super(MovieModel);

        ['createMovie', 'updateMovie'].forEach(
            method => this[method] = this[method].bind(this)
        );
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

    async createMovie(req, res) {
        const isXml = this.isXmlRequest(req);
        const { age_classification, genre, quality_type, title, duration, description, view_count, movie_link } = req.body;
        const validQuality = ['HD', 'UHD', 'SD'];

        try {
            if (!validQuality.includes(quality_type))
                return this.sendResponse(res, 400, 'valid quality types are HD, UHD, and SD.', null, isXml);

            const result = await MovieModel.createMovie(age_classification, genre, quality_type, title, duration, description, view_count, movie_link);
            if (!result) return this.sendResponse(res, 500, 'Movie creation failed', null, isXml);

            this.sendResponse(res, 201, 'Movie created successfully', result, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async updateMovie(req, res)
    {
        const isXml = this.isXmlRequest(req);
        const { age_classification, genre, quality_type, title, duration, description, view_count, movie_link } = req.body;
        const validQuality = ['HD', 'UHD', 'SD'];

        try {
            if (quality_type && !validQuality.includes(quality_type))
                return this.sendResponse(res, 400, 'valid quality types are HD, UHD, and SD.', null, isXml);

            const result = await MovieModel.updateMovie(req.params.id, age_classification, genre, quality_type, title, duration, description, view_count, movie_link);
            this.sendResponse(res, 201, 'Movie updated successfully', result, isXml);
        }
        catch (err){
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new MovieController();
module.exports = controller;