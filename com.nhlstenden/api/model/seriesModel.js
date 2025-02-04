const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SeriesModel extends ModelParent {
    constructor() {
        super("series");
    }

    async getAllEntries() {
        try {
            const result = await database.query(
                "SELECT * FROM public.get_all_series()"
            );

            if (!result) {
                throw new Error("Series fetching failed");
            }

            return result;
        } catch (err) {
            this.handleError("fetching", err);
        }
    }

    async getEntryById(id) {
        try {
            const result = await database.query(
                "SELECT * FROM public.get_series_by_id($1)",
                [id]
            );

            if (!result) {
                throw new Error("Series fetching failed");
            }

            return result;
        } catch (err) {
            this.handleError("fetching", err);
        }
    }

    async deleteEntryById(id) {
        try {
            const result = await database.query(
                "SELECT * FROM public.delete_series_by_id($1)",
                [id]
            );

            if (!result) {
                throw new Error("Series fetching failed");
            }

            return result;
        } catch (err) {
            this.handleError("deleting", err);
        }
    }

    async createSeries(seriesData) {
        try {
            const result = await database.query(
                "SELECT * FROM public.create_series($1, $2, $3, $4, $5, $6)",
                [seriesData.title, seriesData.age_classification, seriesData.genre, seriesData.description, seriesData.quality, seriesData.series_url,]
            );

            if (!result) {
                throw new Error("Series creation failed");
            }

            return result;
        } catch (err) {
            this.handleError("creating", err);
        }
    }

    async updateSeries(id, seriesData) {
        try {
            // Validate id is a number
            const seriesId = parseInt(id, 10);
            if (isNaN(seriesId)) {
                throw new Error("Invalid series ID");
            }

            const result = await database.query(
                `SELECT * FROM public.update_series($1, $2, $3, $4, $5, $6::quality_type, $7)`,
                [seriesId, seriesData.title, parseInt(seriesData.age_classification, 10), parseInt(seriesData.genre, 10), seriesData.description, seriesData.quality, seriesData.series_url,]
            );

            if (!result || result.length === 0) {
                throw new Error("Series update failed");
            }

            return result[0];
        } catch (err) {
            this.handleError("updating", err);
        }
    }
}

module.exports = new SeriesModel();
