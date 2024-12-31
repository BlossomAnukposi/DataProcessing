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
            getAccountByIdQuery: (id) => database.query('SELECT * FROM public.get_account_by_id($1)', [id]),
            getAllEpisodesQuery: () => database.query('SELECT * FROM public.get_all_episodes()'),
            getEpisodeByIdQuery: (id) => database.query('SELECT * FROM public.get_episode_by_id($1)', [id]),
            getAllGenresQuery : () => database.query('SELECT * FROM public.get_all_genres()'),
            getGenreByIdQuery: (id) => database.query('SELECT * FROM public.get_genre_by_id($1)', [id]),
            getAllMoviesQuery : () => database.query('SELECT * FROM public.get_all_movies()'),
            getMovieByIdQuery: (id) => database.query('SELECT * FROM public.get_movie_by_id($1)', [id]),
            getAllPreferencesQuery : () => database.query('SELECT * FROM public.get_all_preferences()'),
            getPreferenceByIdQuery: (id) => database.query('SELECT * FROM public.get_preference_by_id($1)', [id]),
            getAllProfilesQuery : () => database.query('SELECT * FROM public.get_all_profiles()'),
            getProfileByIdQuery: (id) => database.query('SELECT * FROM public.get_profile_by_id($1)', [id]),
            getAllReferralDiscountsQuery : () => database.query('SELECT * FROM public.get_all_referral_discounts()'),
            getReferralDiscountByIdQuery: (id) => database.query('SELECT * FROM public.get_referral_discount_by_id($1)', [id]),
            getAllSeasonsQuery : () => database.query('SELECT * FROM public.get_all_seasons()'),
            getSeasonByIdQuery: (id) => database.query('SELECT * FROM public.get_season_by_id($1)', [id]),
            getAllSeriesQuery : () => database.query('SELECT * FROM public.get_all_series()'),
            getSeriesByIdQuery: (id) => database.query('SELECT * FROM public.get_series_by_id($1)', [id]),
            getAllSubscriptionsQuery : () => database.query('SELECT * FROM public.get_all_subscriptions()'),
            getSubscriptionByIdQuery: (id) => database.query('SELECT * FROM public.get_subscription_by_id($1)', [id]),
            getAllSubtitlesQuery : () => database.query('SELECT * FROM public.get_all_subtitles()'),
            getSubtitleByIdQuery: (id) => database.query('SELECT * FROM public.get_subtitle_by_id($1)', [id]),
            getAllWatchedMediaListsQuery : () => database.query('SELECT * FROM public.get_all_watched_media_lists()'),
            getWatchedMediaListByIdQuery: (id) => database.query('SELECT * FROM public.get_watched_media_list_by_id($1)', [id]),
            getAllWatchlistsQuery : () => database.query('SELECT * FROM public.get_all_watchlists()'),
            getWatchlistByIdQuery: (id) => database.query('SELECT * FROM public.get_watchlist_by_id($1)', [id]),
        };
    }

    async getAllEntries(method) {
        try {
            const queryFunc = this.queries[method];

            if (!queryFunc) {
                console.error(`Invalid query method: ${method}`);
            }

            const result = await queryFunc();
            return result;
        } catch(err) {
            throw new Error(`Error fetching ${this.tableName}s. Error message is: ${err.message}`);
        }
    }

    async getEntryById(entryId, method) {
        try {
            const queryFunc = this.queries[method];

            if (!queryFunc) {
                console.error(`Invalid query method: ${method}`);
            }

            const result = await queryFunc(entryId);

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