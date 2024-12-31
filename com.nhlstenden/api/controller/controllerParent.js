const js2xmlparser = require("js2xmlparser");
const { application } = require("express");

class controllerParent {
    model;

    constructor(model) {
        if (this.constructor == controllerParent) //this makes the class abstract.
        {
            throw new Error("Must be implemented");
        }

        this.model = model;
    }

    // HELPER METHODS
    returnXml(statusCode, message = null, result = null, res) {
        let xml;
        if (result) {
            xml = js2xmlparser.parse("result", {
                message: message,
                result: result
            });
        } else {
            xml = js2xmlparser.parse("message", {
                message: message
            });
        }
        res.set('Content-Type', 'application/xml');
        res.status(statusCode).send(xml);
    }

    returnJson(statusCode, message, result = null, res)
    {
        if (result) {
            return res.status(statusCode).json({
                message: message,
                result: result
            });
        } else {
            return res.status(statusCode).json({
                message: message
            });
        }
    }

    handleError(error, res, isXmlRequest) {
        console.error("Error:", error.message);
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";
        if (isXmlRequest) {
            this.returnXml(statusCode, message, null, res);
        } else {
            this.returnJson(statusCode, message, null, res);
        }
    }

    // ASYNC METHODS - BASIC ENDPOINTS
    async getAllEntries(req, res, method)
    {
        console.log(`Method: ${method}`);
        const acceptHeader = req.headers['accept'];

        try {
            const result = await this.model.getAllEntries(method);

            if (acceptHeader && acceptHeader.includes('application/xml'))
            {
                this.returnXml(200, "Entries retrieved successfully", result, res);
            }
            else
            {
                this.returnJson(200, "Entries retrieved successfully", result, res);
            }
        } catch (error) {
            console.error("controllerParent Error:", error.message);
            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(500, error.message, null, res);
            } else {
                this.returnJson(500, error.message, null, res);
            }
        }
    }

    async getEntryById(req, res, method)
    {
        console.log(`Method: ${method}`);
        const acceptHeader = req.headers['accept'];

        try {
            const result = await this.model.getEntryById(req.params.id, method);

            if (!result) {
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    this.returnXml(404, "Account not found", null, res);
                } else {
                    this.returnJson(404, "Account not found", null, res);
                }
                return;
            }

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(200, "Account retrieved successfully", result, res);
            } else {
                this.returnJson(200, "Account retrieved successfully", result, res);
            }
        } catch (error) {
            console.error("controllerParent Error:", error.message);
            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(500, error.message, null, res);
            } else {
                this.returnJson(500, error.message, null, res);
            }
        }
    }

    async deleteEntry(req, res, method)
    {
        const acceptHeader = req.headers['accept'];

        try {
            const account = await this.model.deleteEntry(req.params.accountId, method);

            if (!account) {
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    this.returnXml(404, "Account not found", null, res);
                } else {
                    this.returnJson(404, "Account not found", null, res);
                }
                return;
            }

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(200, "Account deleted successfully", account.accountId, res);
            } else {
                this.returnJson(200, "Account deleted successfully", account.accountId, res);
            }
        } catch (error) {
            console.error("controllerParent Error:", error.message);
            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(500, error.message, null, res);
            } else {
                this.returnJson(500, error.message, null, res);
            }
        }
    }
}

module.exports = controllerParent;