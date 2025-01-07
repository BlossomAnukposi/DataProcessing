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

            if (!email || !password) return this.sendResponse(res, 400, 'Email address or password required', null, isXml);

            const account = await AccountModel.createAccount(email, password, invitedByAccountId);
            this.sendResponse(res, 200, 'account created successfully.', account, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }

    async updateAccount(req, res)
    {
        const isXml = this.isXmlRequest(req);
        const validStatuses = ['active', 'inactive', 'blocked'];

        try {
            const { email, password, accountStatus } = req.body;

            if(!email && !password && !accountStatus) return this.sendResponse(res, 400, 'At least one field must be provided');

            if (accountStatus && validStatuses.includes(accountStatus))
            {
                const account = await AccountModel.updateAccount(req.params.id, email, password, accountStatus);
                this.sendResponse(res, 200, 'account updated successfully.', account);
            }

            const account = await AccountModel.updateAccount(req.params.id, email, password, accountStatus);
            this.sendResponse(res, 200, 'account updated successfully.', account);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new AccountController();
module.exports = controller;