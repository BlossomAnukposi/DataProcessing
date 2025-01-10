const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SubscriptionModel extends ModelParent
{
    constructor()
    {
        super("subscription");
    }

    async createSubscription(subscriptionType, subscriptionPrice)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_subscription($1, $2)',
                [subscriptionType, subscriptionPrice]
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

    async getSubscriptionById(subscriptionId)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.get_subscription_by_id($1)',
                [subscriptionId]
            );

            if (!result?.length) {
                console.log(`No subscription found with ID ${subscriptionId}.`);
                return null;
            }

            return result[0];
        }
        catch (err) {
            this.handleError('retrieving', err);
        }
    }

    async deleteSubscriptionById(subscriptionId)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.delete_subscription_by_id($1)',
                [subscriptionId]
            );

            if (!result?.length) {
                console.log(`No subscription found with ID ${subscriptionId}.`);
                return null;
            }

            return result[0];
        }
        catch (err) {
            this.handleError('deleting', err);
        }
    }
}

module.exports = new SubscriptionModel();
