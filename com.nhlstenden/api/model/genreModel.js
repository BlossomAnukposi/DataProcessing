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
}

module.exports = new GenreModel();