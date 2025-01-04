const database = require("../../config/database");
const ModelParent = require("./modelParent");

class ReferralDiscountModel extends ModelParent
{
    constructor()
    {
        super("referral discount");
    }
}

module.exports = new ReferralDiscountModel();