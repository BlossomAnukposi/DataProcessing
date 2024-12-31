const database = require("../../config/database");

class modelParent {
    tableName;
    queries;

    constructor(tableName) {
        if (this.constructor === modelParent) {
            throw new Error("modelParent is an abstract class and cannot be instantiated directly");
        }

        this.tableName = tableName;
        this.queries = {
            getAllAccountsQuery: () => database.query('SELECT * FROM public.get_all_accounts()'),
            getAllEpisodesQuery: () => database.query('SELECT * FROM public.get_all_episodes()'),
            getAllGenresQuery : () => database.query('SELECT * FROM public.get_all_genres()'),
            getAllMoviesQuery : () => database.query('SELECT * FROM public.get_all_movies()'),
            getAllPreferencesQuery : () => database.query('SELECT * FROM public.get_all_preferences()'),
            getAllProfilesQuery : () => database.query('SELECT * FROM public.get_all_profiles()'),
            getAllReferralDiscountsQuery : () => database.query('SELECT * FROM public.get_all_referral_discounts()'),
            getAllSeasonsQuery : () => database.query('SELECT * FROM public.get_all_seasons()'),
            getAllSeriesQuery : () => database.query('SELECT * FROM public.get_all_series()'),
            getAllSubscriptionsQuery : () => database.query('SELECT * FROM public.get_all_subscriptions()'),
            getAllSubtitlesQuery : () => database.query('SELECT * FROM public.get_all_subtitles()'),
            getAllWatchedMediaListsQuery : () => database.query('SELECT * FROM public.get_all_watched_media_lists()'),
            getAllWatchlistsQuery : () => database.query('SELECT * FROM public.get_all_watchlists()'),
        };
    }

    async getAllEntries(method) {
        try {
            const queryFunc = this.queries[method];

            if (!queryFunc) {
                console.error(`Invalid query method: ${method}`);
            }

            const result = await queryFunc();  // Call the function
            return result;
        } catch(err) {
            throw new Error(`Error fetching ${this.tableName}s. Error message is: ${err.message}`);
        }
    }

    async getEntryById(entryId, method) {
        try {
            const result = await database.query(`SELECT * FROM public.${method}($1)`, [entryId]);

            if (!result || result.length === 0) {
                console.log(`No ${this.tableName} found for ID:`, entryId);
                console.error(`No ${this.tableName} found with the specified ID.`);
            }

            return result[0];
        } catch (err) {
            console.error("modelParent Error:", err.message);
            throw new Error(`Error fetching ${this.tableName}. Error message is: ${err.message}`);
        }
    }

    async deleteEntry(entryId, method) {
        try {
            const result = await database.query(`SELECT * FROM public.${method}($1)`, [entryId]);

            if (!result || result.length === 0) {
                console.error(`${this.tableName} not found`);
            }

            return result[0];
        } catch (err) {
            console.error("modelParent Error:", err.message);

            if (err.message.includes(`${this.tableName} with ID`)) {
                throw new Error(`${this.tableName} not found`);
            }

            throw new Error(`Error deleting ${this.tableName}: ${err.message}`);
        }
    }
}

module.exports = modelParent;