const catchAsync = require("../utils/catchAsync");
const subscriptionService = require("../services/subscription.service");

const createSubscription = catchAsync(async (req, res) => {

    const result = await subscriptionService.createSubscription(req.body);

    res.status(201).send({
        message: "Subscription Created",
        data: result,
    });
});

const getSubscriptions = async (req, res) => {

    const subscriptions = await subscriptionService.getSubscriptions();

    res.status(200).send({
        message: "Subscriptions fetched successfully",
        data: subscriptions,
    });
};

const getSingleSubscriptions = catchAsync(async (req, res) => {
    const subscription = await subscriptionService.getSingleSubscriptions(req.params.id);

    res.status(200).send({
        message: "Subscription fetched successfully",
        data: subscription,
    });
});

const updateSubscription = catchAsync(async (req, res) => {


    const result = await subscriptionService.updateSubscription(req.params.id, req.body);

    res.status(200).send({
        message: "Subscription Updated",
        data: result,
    });
});

const deleteSubscription = catchAsync(async (req, res) => {
    const result = await subscriptionService.deleteSubscription(req.params.id);
    res.status(200).send({
        message: "Subscription Deleted Successfully",
    });
});

module.exports = {
    createSubscription,
    getSubscriptions,
    getSingleSubscriptions,
    updateSubscription,
    deleteSubscription,
};