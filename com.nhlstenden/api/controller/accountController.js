const AccountModel = require("../model/accountModel");
const ControllerParent = require("../../api/controller/controllerParent");

class AccountController extends ControllerParent
{
    constructor()
    {
        super(AccountModel);

        ['createAccount', 'updateAccount'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    //OVERWRITTEN
    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllAccountsQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getAccountByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteAccountByIdQuery');
    }

    async createAccount(req, res)
    {
        const isXml = this.isXmlRequest(req);

        try
        {
            const {email, password, invitedByAccountId} = req.body;

            !email || !password ? this.sendResponse(res, 400, 'email address or password required', null, isXml) : null;

            const account = await AccountModel.createAccount(email, password, invitedByAccountId);
            this.sendResponse(res, 200, 'account created successfully.', account, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }

    //OTHER METHODS
    async createAccount(req, res)
    {
        const acceptHeader = req.headers['accept'];

        try {
            const { email, password, invitedByAccountId } = req.body;

            if (!email || !password) {
                const errorMessage = "Email and password are required";
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    this.returnXml(400, errorMessage, null, res);
                } else {
                    this.returnJson(400, errorMessage, null, res);
                }
                return;
            }

            const account = await accountModel.createAccount(email, password, invitedByAccountId);

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(201, "Account created successfully", account, res);
            } else {
                this.returnJson(201, "Account created successfully", account, res);
            }

            acceptHeader && acceptHeader.includes('application/xml') ? this.returnXml() : this.returnJson();

        } catch (error) {
            console.error("Controller Error:", error.message);
            const status = error.message.includes('required') ? 400 : 500;

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(status, error.message, null, res);
            } else {
                this.returnJson(status, error.message, null, res);
            }
        }
    }

    async updateAccount(req, res)
    {
        const acceptHeader = req.headers['accept'];
        const validStatuses = ['active', 'inactive', 'blocked'];

        try {
            const accountId = req.params.accountId;
            const { email, password, accountStatus } = req.body;

            if (!email && !password && !accountStatus) {
                const errorMessage = "At least one field (email, password, or accountStatus) must be provided";
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    this.returnXml(400, errorMessage, null, res);
                } else {
                    this.returnJson(400, errorMessage, null, res);
                }
                return;
            }

            if (accountStatus && !validStatuses.includes(accountStatus)) {
                const errorMessage = `Invalid account status. Must be one of: ${validStatuses.join(", ")}.`;
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    this.returnXml(400, errorMessage, null, res);
                } else {
                    this.returnJson(400, errorMessage, null, res);
                }
                return;
            }

            const account = await accountModel.updateAccount(accountId, email, password, accountStatus);

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(200, "Account updated successfully", account, res);
            } else {
                this.returnJson(200, "Account updated successfully", account, res);
            }
        } catch (error) {
            console.error("Controller Error:", error.message);

            let status = 500;
            if (error.message.includes('Account not found')) {
                status = 404;
            } else if (error.message.includes('No updates provided')) {
                status = 400;
            }

            if (acceptHeader && acceptHeader.includes('application/xml')) {
                this.returnXml(status, error.message, null, res);
            } else {
                this.returnJson(status, error.message, null, res);
            }
        }
    }
}

const controller = new AccountController();
module.exports = controller;