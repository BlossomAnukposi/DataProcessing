const accountModel = require("../model/accountModel");
const controllerParent = require("../../api/controller/controllerParent");

class accountController extends controllerParent
{
    constructor()
    {
        super(accountModel);

        this.getAllEntries = this.getAllEntries.bind(this);
        this.getEntryById = this.getEntryById.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllAccountsQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getAccountByIdQuery');
    }

    // getAccountById = async (req, res) => {
    //     const acceptHeader = req.headers['accept'];
    //
    //     try {
    //         const result = await accountModel.getEntryById(req.params.id);
    //
    //         if (!result) {
    //             if (acceptHeader && acceptHeader.includes('application/xml')) {
    //                 this.returnXml(404, "Account not found", null, res);
    //             } else {
    //                 this.returnJson(404, "Account not found", null, res);
    //             }
    //             return;
    //         }
    //
    //         if (acceptHeader && acceptHeader.includes('application/xml')) {
    //             this.returnXml(200, "Account retrieved successfully", result, res);
    //         } else {
    //             this.returnJson(200, "Account retrieved successfully", result, res);
    //         }
    //     } catch (error) {
    //         console.error("Controller Error:", error.message);
    //         if (acceptHeader && acceptHeader.includes('application/xml')) {
    //             this.returnXml(500, error.message, null, res);
    //         } else {
    //             this.returnJson(500, error.message, null, res);
    //         }
    //     }
    // }

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

    // deleteAccount = async (req, res) => {
    //     const acceptHeader = req.headers['accept'];
    //
    //     try {
    //         const account = await accountModel.deleteAccount(req.params.accountId);
    //
    //         if (!account) {
    //             if (acceptHeader && acceptHeader.includes('application/xml')) {
    //                 this.returnXml(404, "Account not found", null, res);
    //             } else {
    //                 this.returnJson(404, "Account not found", null, res);
    //             }
    //             return;
    //         }
    //
    //         if (acceptHeader && acceptHeader.includes('application/xml')) {
    //             this.returnXml(200, "Account deleted successfully", account.accountId, res);
    //         } else {
    //             this.returnJson(200, "Account deleted successfully", account.accountId, res);
    //         }
    //     } catch (error) {
    //         console.error("Controller Error:", error.message);
    //         if (acceptHeader && acceptHeader.includes('application/xml')) {
    //             this.returnXml(500, error.message, null, res);
    //         } else {
    //             this.returnJson(500, error.message, null, res);
    //         }
    //     }
    // }

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

const controller = new accountController();
module.exports = controller;