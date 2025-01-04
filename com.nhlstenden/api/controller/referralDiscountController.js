const referralDiscountModel = require("../model/referralDiscountModel");
const ControllerParent = require("../../api/controller/controllerParent");

class ReferralDiscountController extends ControllerParent
{
    constructor()
    {
        super(referralDiscountModel);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllReferralDiscountsQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getReferralDiscountByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteReferralDiscountByIdQuery');
    }
}

module.exports = new ReferralDiscountController();