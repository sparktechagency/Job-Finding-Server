const { CareerEvent } = require("../models");

const createCareerEvent = async (eventData) => {
    const event = await CareerEvent.create(eventData);
    return event;
};

const updateCareerEvent = async (id, eventData) => {
    const event = await CareerEvent.findByIdAndUpdate(id, eventData, { new: true });
    return event;
};

const getAllCareerEvents = async () => {
    const events = await CareerEvent.find();
    return events;
};

const getCareerEventById = async (id) => {
    const event = await CareerEvent.findById(id);
    return event;
};

module.exports = {
    createCareerEvent,
    updateCareerEvent,
    getAllCareerEvents,
    getCareerEventById
    // add other methods as needed
};