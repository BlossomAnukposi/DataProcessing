const database = require("../../config/database");

class account_model {
    async get_all_accounts()
    {
        try
        {
            return await database.query('SELECT * FROM public.get_all_accounts()');
        }
        catch(err)
        {
            throw new Error("Error fetching accounts. Error message is: " + err.message);
        }
    }

    async get_account_by_id(account_id) {
        try
        {
            const result = await database.query('SELECT * FROM public.get_account_by_id($1)', [account_id]);

            if (!result || result.length === 0)
            {
                console.log("No account found for ID:", account_id);
                throw new Error("No account found with the specified ID.");
            }

            return result[0];
        }
        catch (err)
        {
            console.error("Model Error:", err.message);
            throw new Error("Error fetching accounts. Error message is: " + err.message);
        }
    }

    async delete_account(account_id) {
        try
        {
            const result = await database.query('SELECT * FROM public.delete_account_by_id($1)', [account_id]);

            if (!result || result.length === 0)
            {
                throw new Error("Account not found");
            }

            return result[0];
        }
        catch (err)
        {
            console.error("Model Error:", err.message);

            if (err.message.includes('Account with ID'))
            {
                throw new Error("Account not found");
            }

            throw new Error("Error deleting account: " + err.message);
        }
    }

    async create_account(email, password, invited_by_account_id = null)
    {
        try
        {
            const result = await database.query(
                'SELECT * FROM public.create_account($1, $2, $3)',
                [email, password, invited_by_account_id]
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

    async update_account(account_id, email = null, password = null, account_status = null)
    {
        try
        {
            console.log('Updating account:', {
                account_id,
                email: email ? 'provided' : 'not provided',
                password: password ? 'provided' : 'not provided',
                account_status
            });

            const result = await database.query(
                'SELECT * FROM public.update_account($1, $2, $3, $4)',
                [account_id, email, password, account_status]
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

module.exports = new account_model();
