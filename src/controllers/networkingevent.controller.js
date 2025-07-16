const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");


const createNetworkingEvent = catchAsync(async (req, res) => {
    // const { title, date, location, description } = req.body;
    // const networkingEvent = await networkingEventService.createNetworkingEvent(title, date, location, description);

    res.status(httpStatus.CREATED).json(
        response({
            message: "Networking Event Created Successfully",
            status: "OK",
            statusCode: httpStatus.CREATED,
            // data: networkingEvent,
        })
    );
});



module.exports = {
    createNetworkingEvent



};