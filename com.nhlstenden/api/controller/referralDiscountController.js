const referralDiscountModel = require("../model/referralDiscountModel");
const controllerParent = require("../../api/controller/controllerParent");

class referralDiscountController extends controllerParent
{
    constructor()
    {
        super(referralDiscountModel);

        this.getAllEntries = this.getAllEntries.bind(this);
        this.getEntryById = this.getEntryById.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllReferralDiscountsQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getReferralDiscountByIdQuery');
    }
}

module.exports = new referralDiscountController();