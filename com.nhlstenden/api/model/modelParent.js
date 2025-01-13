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
            'referral_discount', 'season', 'subscription', 'subtitle',
            'watched_media_list', 'watchlist'
        ];
    
        return tables.reduce((queries, table) => {
            const camelCaseTable = table.split('_').map((word, index) =>
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            const capitalizedCamelCase = camelCaseTable.charAt(0).toUpperCase() + camelCaseTable.slice(1);
            const snakeCaseTable = table.toLowerCase();
    
            // Get all entries query
            queries[`getAll${capitalizedCamelCase}sQuery`] =
                () => database.query(`SELECT * FROM public.get_all_${snakeCaseTable}s()`);
    
            // Get by ID query
            queries[`get${capitalizedCamelCase}ByIdQuery`] =
                (id) => database.query(`SELECT * FROM public.get_${snakeCaseTable}_by_id($1)`, [id]);
    
            // Delete by ID query
            queries[`delete${capitalizedCamelCase}ByIdQuery`] =
                (id) => database.query(`SELECT * FROM public.delete_${snakeCaseTable}_by_id($1)`, [id]);
    
            return queries;
        }, {});
    }

    // Generic error handler
    handleError(operation, err) {
        console.error(`ModelParent Error (${operation}):`, err.message);
        console.error(err.stack);

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