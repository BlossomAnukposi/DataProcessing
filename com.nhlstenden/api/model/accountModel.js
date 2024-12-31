const database = require("../../config/database");
const modelParent = require("./modelParent");

class accountModel extends modelParent
{
    constructor()
    {
        super("account");
    }

    // async get_account_by_id(account_id)
    // {
    //     try
    //     {
    //         const result = await database.query('SELECT * FROM public.get_account_by_id($1)', [account_id]);
    //
    //         if (!result || result.length === 0)
    //         {
    //             console.log("No account found for ID:", account_id);
    //             console.error("No account found with the specified ID.");
    //         }
    //
    //         return result[0];
    //     }
    //     catch (err)
    //     {
    //         console.error("Model Error:", err.message);
    //         throw new Error("Error fetching accounts. Error message is: " + err.message);
    //     }
    // }

    // async delete_account(account_id)
    // {
    //     try
    //     {
    //         const result = await database.query('SELECT * FROM public.delete_account_by_id($1)', [account_id]);
    //
    //         if (!result || result.length === 0)
    //         {
    //             console.error("Account not found");
    //         }
    //
    //         return result[0];
    //     }
    //     catch (err)
    //     {
    //         console.error("Model Error:", err.message);
    //
    //         if (err.message.includes('Account with ID'))
    //         {
    //             throw new Error("Account not found");
    //         }
    //
    //         throw new Error("Error deleting account: " + err.message);
    //     }
    // }

    async createAccount(email, password, invitedByAccountId = null)
    {
        try
        {
            const result = await database.query(
                'SELECT * FROM public.create_account($1, $2, $3)',
                [email, password, invitedByAccountId]
            );

            if (!result || result.length === 0)
            {
                throw new Error("Account creation failed");
            }

            return result[0];
        }
        catch (error)
        {
            console.error("Model Error:", error.message);
            throw error;
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

module.exports = new accountModel();
