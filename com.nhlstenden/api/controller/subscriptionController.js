const SubscriptionModel = require("../model/subscriptionModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SubscriptionController extends ControllerParent
{
    constructor()
    {
        super(SubscriptionModel);

        ['createSubscription', 'updateSubscription', 'getActiveSubscriptions'].forEach(
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
            const { subscriptionPrice, subscriptionType } = req.body;

            if (!subscriptionType || !subscriptionPrice) 
            {
                return this.sendResponse(res, 400, 'Subscription type and price are required', null, isXml);
            }

            const subscription = await SubscriptionModel.createSubscription(subscriptionPrice , subscriptionType);
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

    async getActiveSubscriptions(req, res)
    {
        const isXml = this.isXmlRequest(req);
        console.log("getActiveSubscriptions method called"); // Add this line for debugging
    
        try
        {
            const subscriptions = await SubscriptionModel.getActiveSubscriptions();
    
            if (!subscriptions || subscriptions.length === 0)
                return this.sendResponse(res, 404, 'No active subscriptions found', null, isXml);
    
            this.sendResponse(res, 200, 'Active subscriptions retrieved successfully', subscriptions, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new SubscriptionController();
module.exports = controller;
