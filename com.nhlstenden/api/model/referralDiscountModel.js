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
}

module.exports = new ReferralDiscountModel();