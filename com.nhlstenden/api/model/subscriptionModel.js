const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SubscriptionModel extends ModelParent
{
    constructor()
    {
        super("subscription");
    }

    async createSubscription(subscriptionPrice , subscriptionType)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_subscription($1, $2)',
                [subscriptionPrice, subscriptionType]
            );

            if (!result?.length) {
                console.log(`Could not create subscription.`);
                return null;
            }
            return result[0];
        }
        catch (err) {
            this.handleError('creating', err);
        }
    }

    async updateSubscription(subscriptionId, subscriptionType = null, subscriptionPrice = null)
    {
        try {
            console.log('Updating subscription:', {
                subscriptionId,
                subscriptionType: subscriptionType ? 'provided' : 'not provided',
                subscriptionPrice: subscriptionPrice ? 'provided' : 'not provided'
            });

            const result = await database.query(
                'SELECT * FROM public.update_subscription($1, $2, $3)',
                [subscriptionId, subscriptionType, subscriptionPrice]
            );

            if (!result || result.length === 0) {
                throw new Error('Subscription not found or no changes made.');
            }

            return result[0];
        }
        catch (error) {
            console.error('Model Error:', error.message);
            throw error;
        }
    }

    //THIS IS A VIEW
    async getActiveSubscriptions() {
        try {
            const result = await database.query(
                'SELECT * FROM public.active_subscriptions'
            );

            if (!result) {
                console.log('No active subscriptions found.');
                return null;
            }

            return result;
        }
        catch (error) {
            console.error('Error fetching active subscriptions:', error);
            this.handleError('getting active subscriptions', error);
        }
    }

    async getAccountSubscriptions(){
        try {
            const result = await database.query(
                'SELECT * FROM public.account_subscriptions'
            );

            if (!result) {
                console.log('No subscriptions found for this account.');
                return null;
            }

            return result;
        }
        catch (error) {
            console.error('Error fetching account subscriptions:', error);
            this.handleError('getting account subscriptions', error);
        }
    }
}

module.exports = new SubscriptionModel();
