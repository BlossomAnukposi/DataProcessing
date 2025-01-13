const database = require("../../config/database");
const ModelParent = require("./modelParent");
const bcrypt = require("bcryptjs");

class AccountModel extends ModelParent
{
    constructor()
    {
        super("account");
    }

    async createAccount(email, password, invitedByAccount = null) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const result = await database.query(
                'SELECT * FROM public.create_account($1, $2, $3)',
                [hashedPassword, email, invitedByAccount]
            );

            if (!result?.length) {
                console.log("Could not create account.");
                return null;
            }

            return result[0];
        }
        catch (err) {
            this.handleError('creating', err);
        }
    }

    async getAccountByEmail(email) {
        try {
            const result = await database.query(
                'SELECT * FROM public.get_account_by_email($1)',
                [email]
            );

            if (!result?.length) {
                console.log("Account not found.");
                return null;
            }

            return result[0];
        }
        catch (err) {
            this.handleError('fetching account by email', err);
        }
    }

    async updateAccount(accountId, email = null, password = null, accountStatus = null)
    {
        try
        {
            console.log('Updating account:', {
                accountId,
                email: email ? 'provided' : 'not provided',
                password: password ? 'provided' : 'not provided',
                accountStatus
            });

            const result = await database.query(
                'SELECT * FROM public.update_account($1, $2, $3, $4)',
                [accountId, email, password, accountStatus]
            );

            if (!result || result.length === 0)
            {
                throw new Error('Account not found');
            }

            return result[0];
        }
        catch (error)
        {
            console.error('Model Error:', error.message);
            throw error;
        }
    }
}

module.exports = new AccountModel();
