const database = require("../../config/database");
const ModelParent = require("./modelParent");

class MovieModel extends ModelParent
{
    constructor()
    {
        super("movie");
    }

    async createMovie(age_classification, genre, quality_type, title, duration, description, view_count, movie_link) {
        try {
            const result = await database.query(
                `SELECT * FROM public.create_movie($1, $2, $3, $4, $5, $6, $7, $8)`,
                [age_classification, genre, quality_type, title, duration, description, view_count, movie_link]
            );

            if (!result) {
                throw new Error('Movie creation failed');
            }

            return result;
        } catch (err) {
            this.handleError('creating movie', err);
        }
    }

    async updateMovie(movieId, age_classification = null, genre = null, quality_type = null, title = null, duration = null, description = null, view_count = null, movie_link = null)
    {
        try {
            const result = await database.query(
                `SELECT * FROM public.update_movie($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [movieId, age_classification, genre, quality_type, title, duration, description, view_count, movie_link]
            );

            if (!result) {
                throw new Error('Movie update failed');
            }

            return result;
        }
        catch (err){
            this.handleError('updating movie', err);
        }
    }
}

module.exports = new MovieModel();