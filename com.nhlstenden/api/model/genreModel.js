const database = require("../../config/database");
const ModelParent = require("./modelParent");

class GenreModel extends ModelParent
{
    constructor()
    {
        super("genre");
    }

    async createGenre(name, description) {
        try {
            const result = await database.query(
                `SELECT * FROM public.create_genre($1, $2)`,
                [name, description]
            );

            if (!result) {
                throw new Error("Genre creation failed: No rows returned.");
            }

            return result;
        } catch (err) {
            this.handleError("creating genre", err);
        }
    }

    //THIS IS A VIEW
    async getMoviesByGenre(genreId) {
        try {
            const result = await database.query(
                `SELECT * FROM public.movies_by_genre WHERE genre_id = $1`,
                [genreId]
            );

            if (!result) {
                throw new Error("Fetching movies by genre failed: No rows returned.");
            }

            return result;
        } catch (err) {
            this.handleError("fetching movies by genre", err);
        }
    }

    //THIS IS A VIEW
    async getSeriesByGenre(genreId) {
        try {
            const result = await database.query(
                `SELECT * FROM public.series_by_genre WHERE genre_id = $1`,
                [genreId]
            );

            if (!result) {
                throw new Error("Fetching series by genre failed: No rows returned.");
            }

            return result;
        } catch (err) {
            this.handleError("fetching series by genre", err);
        }
    }
}

module.exports = new GenreModel();