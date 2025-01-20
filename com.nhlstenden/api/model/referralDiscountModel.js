const database = require("../../config/database");
const ModelParent = require("./modelParent");

class ReferralDiscountModel extends ModelParent
{
    constructor()
    {
        super("referral discount");
    }

    async createReferralDiscount(accountId, numberOfReferralUses, referralLink)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_referral_discount($1, $2, $3)',
                [accountId, numberOfReferralUses, referralLink]
            );

            if (!result) {
                throw new Error('Referral discount creation failed');
            }

            return result;
        }
        catch (err) {
            console.error('Error creating referral discount:', err);
            this.handleError('creating referral discount', err);
        }
    }

    //THIS IS A VIEW
    async getAllReferralStatuses(){
        try {
            const result = await database.query('SELECT * FROM public.referral_stats');
            if (!result) {
                throw new Error('Fetching referral statuses failed');
            }
            return result;
        } catch (err) {
            console.error('Error fetching referral statuses:', err);
            this.handleError('fetching referral statuses', err);
        }
    }
}

module.exports = new ReferralDiscountModel();