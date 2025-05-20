const Subscription = require('../models/subscription.model'); // adjust the path as needed
const ApiError = require('../utils/ApiError');



const createSubscription = async (data) => {
    const { name, price, subType, features } = data;

    const subscription = await Subscription.create({
        name,
        price,
        subType,
        features
    });
    return subscription;

};

const getSubscriptions = async () => {
    const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });
    return subscriptions;
}

const getSingleSubscriptions = async (id) => {
    const subscription = await Subscription.findById(id);
    return subscription;
}

const updateSubscription = async (id, data) => {

    const { name, price, subType, features } = data;

    const findById = await Subscription.findById(id);
    if (!findById) {
        throw new ApiError(404, 'Subscription not found');
    }

    const subscription = await Subscription.findByIdAndUpdate(id, {
        name,
        price,
        subType,
        features
    }, { new: true });

    return subscription;
}

const deleteSubscription = async (id) => {

    const subscriptionFind = await Subscription.findById(id);
    if (!subscriptionFind) {
        throw new ApiError(404, 'Subscription not found');
    }

    const subscription = await Subscription.findByIdAndDelete(id);



    return subscription;
}

module.exports = {
    createSubscription,
    getSubscriptions,
    updateSubscription,
    getSingleSubscriptions,
    deleteSubscription
}