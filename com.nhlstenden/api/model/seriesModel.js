const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SeriesModel extends ModelParent {
    constructor() {
        super("series");
    }

    async getAllEntries() {
        try {
            const result = await database.query('SELECT * FROM public.get_all_series()');

            if (!result) {
                throw new Error('Series fetching failed');
            }

            return result;
        } catch (err) {
            this.handleError('fetching', err);
        }
    }

    async getEntryById(id) {
        try {
            const result = await database.query('SELECT * FROM public.get_series_by_id($1)', [id]);

            if (!result) {
                throw new Error('Series fetching failed');
            }

            return result;
        } catch (err) {
            this.handleError('fetching', err);
        }
    }

    async deleteEntryById(id) {
        try {
            const result = await database.query('SELECT * FROM public.delete_series_by_id($1)', [id]);

            if (!result) {
                throw new Error('Series fetching failed');
            }

            return result;
        } catch (err) {
            this.handleError('deleting', err);
        }
    }
}

module.exports = new SeriesModel();