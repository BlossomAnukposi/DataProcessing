const js2xmlparser = require("js2xmlparser");

class ControllerParent {
    constructor(model) {
        if (this.constructor === ControllerParent) {
            throw new Error("Must be implemented");
        }
        this.model = model;

        ['getAllEntries', 'getEntryById', 'deleteEntryById'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    //HELPER methods
    isXmlRequest(req) {
        return req.headers['accept']?.includes('application/xml');
    }

    sendResponse(res, statusCode, message, result = null, isXml = false) {
        const payload = result ? { message, result } : { message };

        if (isXml) {
            const xml = js2xmlparser.parse(result ? "result" : "message", payload);
            res.set('Content-Type', 'application/xml');
            res.status(statusCode).send(xml);
        } else {
            res.status(statusCode).json(payload);
        }
    }

    handleError(error, res, isXml) {
        console.error("Error:", error.message);

        let status;
        let message = error.message || "Internal server error";

        if (error.message.includes('required')) {
            status = 400;  //Missing fields
        } else if (error.message.includes('violates foreign key constraint')) {
            status = 409;  //Database constraint violation
            message = "A related record prevents this action. Please check dependencies.";
        } else if (error.message.includes('not found')) {
            status = 404;  //Not found
        } else if (error.code === '23505') {  //Postgres specific violation
            status = 409;
            message = "Duplicate record. This entry already exists.";
        } else {
            status = error.statusCode || 500;  //Other
        }

        console.error("Status:", status);
        if (error.stack) {
            console.error("Stack trace:", error.stack);
        }

        this.sendResponse(res, status, message, null, isXml);
    }

    async handleRequest(req, res, operation, method) {
        console.log(`Method: ${method}`);
        const isXml = this.isXmlRequest(req);

        try {
            const result = await operation();

            if (!result && ['getEntryById', 'deleteEntryById'].includes(method)) {
                return this.sendResponse(res, 404, "Account not found", null, isXml);
            }

            const successMessages = {
                getAllEntries: "Entries retrieved successfully",
                getEntryById: "Account retrieved successfully",
                deleteEntryById: "Account deleted successfully"
            };

            const finalResult = method === 'deleteEntryById' ? result.accountId : result;
            this.sendResponse(res, 200, successMessages[method], finalResult, isXml);
        } catch (error) {
            this.handleError(error, res, isXml);
        }
    }

    // CRUD operations
    async getAllEntries(req, res, method) {
        return this.handleRequest(req, res,
            () => this.model.getAllEntries(method),
            'getAllEntries'
        );
    }

    async getEntryById(req, res, method) {
        return this.handleRequest(req, res,
            () => this.model.getEntryById(req.params.id, method),
            'getEntryById'
        );
    }

    async deleteEntryById(req, res, method) {
        return this.handleRequest(req, res,
            () => this.model.deleteEntryById(req.params.id, method),
            'deleteEntryById'
        );
    }
}

module.exports = ControllerParent;