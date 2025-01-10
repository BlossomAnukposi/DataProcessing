const SubscriptionModel = require("../model/subscriptionModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SubscriptionController extends ControllerParent
{
    constructor()
    {
        super(SubscriptionModel);

        ['createSubscription', 'updateSubscription'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    // OVERWRITTEN METHODS
    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllSubscriptionsQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getSubscriptionByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteSubscriptionByIdQuery');
    }

    // CUSTOM METHODS

    async createSubscription(req, res)
    {
        const isXml = this.isXmlRequest(req);

        try
        {
            const { subscriptionType, subscriptionPrice } = req.body;

            if (!subscriptionType || !subscriptionPrice) 
            {
                return this.sendResponse(res, 400, 'Subscription type and price are required', null, isXml);
            }

            const subscription = await SubscriptionModel.createSubscription(subscriptionType, subscriptionPrice);
            this.sendResponse(res, 200, 'Subscription created successfully.', subscription, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }

    async updateSubscription(req, res)
    {
        const isXml = this.isXmlRequest(req);

        try 
        {
            const { subscriptionType, subscriptionPrice } = req.body;

            if (!subscriptionType && !subscriptionPrice) 
            {
                return this.sendResponse(res, 400, 'At least one field must be provided to update');
            }

            const subscription = await SubscriptionModel.updateSubscription(req.params.id, subscriptionType, subscriptionPrice);
            this.sendResponse(res, 200, 'Subscription updated successfully.', subscription, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new SubscriptionController();
module.exports = controller;
