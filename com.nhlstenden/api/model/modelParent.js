const database = require("../../config/database");

class ModelParent {
    constructor(tableName) {
        if (this.constructor === ModelParent) {
            throw new Error("ModelParent is an abstract class and cannot be instantiated directly");
        }
        this.tableName = tableName;
        this.queries = this.initializeQueries();
    }

    // Initialize all queries dynamically
    initializeQueries() {
        const tables = [
            'account', 'episode', 'genre', 'movie', 'preference', 'profile',
            'referralDiscount', 'season', 'series', 'subscription', 'subtitle',
            'watchedMediaList', 'watchlist'
        ];

        return tables.reduce((queries, table) => {
            const capitalizedTableName = table.charAt(0).toUpperCase() + table.slice(1);

            // Get all entries query
            queries[`getAll${capitalizedTableName}sQuery`] =
                () => database.query(`SELECT * FROM public.get_all_${table.toLowerCase()}s()`);

            // Get by ID query
            queries[`get${capitalizedTableName}ByIdQuery`] =
                (id) => database.query(`SELECT * FROM public.get_${table.toLowerCase()}_by_id($1)`, [id]);

            // Delete by ID query
            queries[`delete${capitalizedTableName}ByIdQuery`] =
                (id) => database.query(`SELECT * FROM public.delete_${table.toLowerCase()}_by_id($1)`, [id]);

            return queries;
        }, {});
    }

    // Generic error handler
    handleError(operation, err) {
        console.error(`ModelParent Error (${operation}):`, err.message);
        const baseError = `Error ${operation} ${this.tableName}`;

        if (err.message.includes(`${this.tableName} with ID`)) {
            throw new Error(`${this.tableName} not found`);
        }
        throw new Error(`${baseError}${operation === 'fetching' ? 's' : ''}: ${err.message}`);
    }

    // Generic query executor
    async executeQuery(queryName, params = null) {
        const queryFunc = this.queries[queryName];
        if (!queryFunc) {
            throw new Error(`Invalid query method: ${queryName}`);
        }
        return params ? queryFunc(params) : queryFunc();
    }

    // CRUD operations
    async getAllEntries(method) {
        try {
            return await this.executeQuery(method);
        } catch(err) {
            this.handleError('fetching', err);
        }
    }

    async getEntryById(entryId, method) {
        try {
            const result = await this.executeQuery(method, entryId);

            if (!result?.length) {
                console.log(`No ${this.tableName} found for ID: ${entryId}`);
                return null;
            }
            return result[0];
        } catch (err) {
            this.handleError('fetching', err);
        }
    }

    async deleteEntryById(entryId, method) {
        try {
            const result = await this.executeQuery(method, entryId);

            if (!result?.length) {
                console.error(`Could not delete ${this.tableName} with ID: ${entryId}`);
                return null;
            }
            return result[0];
        } catch (err) {
            this.handleError('deleting', err);
        }
    }
}

module.exports = ModelParent;