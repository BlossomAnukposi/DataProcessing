const ReferralDiscountModel = require("../model/referralDiscountModel");
const ControllerParent = require("../../api/controller/controllerParent");

class ReferralDiscountController extends ControllerParent
{
    constructor()
    {
        super(ReferralDiscountModel);

        this.createReferralDiscount = this.createReferralDiscount.bind(this)
        this.getAllReferralStatuses = this.getAllReferralStatuses.bind(this)
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

    async createReferralDiscount(req, res)
    {
        const isXml = this.isXmlRequest(req);

        try {
            const { accountId, numberOfReferralUses, referralLink } = req.body;

            if (accountId === undefined || numberOfReferralUses === undefined || referralLink === undefined) {
                return this.sendResponse(res, 400, "All fields are required", null, isXml);
            }

            const referralDiscount = await ReferralDiscountModel.createReferralDiscount(accountId, numberOfReferralUses, referralLink);

            this.sendResponse(res, 201, "Referral discount created successfully", referralDiscount, isXml);
        }
        catch (err) {
            console.error('Error creating referral discount:', err);
            this.handleError(err, res, isXml);
        }
    }

    async getAllReferralStatuses(req, res){
        try{
            const statuses = await ReferralDiscountModel.getAllReferralStatuses();

            if(!statuses)
                return this.sendResponse(res, 404, 'No referral discount statuses found', null, this.isXmlRequest(req));

            this.sendResponse(res, 200, "Referral discount statuses retrieved successfully", statuses, this.isXmlRequest(req));
        } catch (err){
            console.error('Error retrieving referral discount statuses:', err);
            this.handleError(err, res, this.isXmlRequest(req));
        }
    }
}

module.exports = new ReferralDiscountController();