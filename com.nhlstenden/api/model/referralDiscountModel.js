const database = require("../../config/database");
const modelParent = require("./modelParent");

class referralDiscountModel extends modelParent
{
    constructor()
    {
        super("referral discount");
    }
}

module.exports = new referralDiscountModel();