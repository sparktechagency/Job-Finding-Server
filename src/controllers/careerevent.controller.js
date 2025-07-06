// this is a controller for the careerevent model
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { careerEventService } = require("../services");
const httpStatus = require("http-status");


const createCareerEvent = catchAsync(async (req, res) => {

    if (req.files.image) {
        req.body.image = `/uploads/career/` + req.files.image[0].filename;
    }
    if (req.files.blogImage) {
        req.body.blogImage = `/uploads/career/` + req.files.blogImage[0].filename;
    }
    const result = await careerEventService.createCareerEvent(req.body);
    res.status(httpStatus.CREATED).json(
        response({
            message: "Career Event Created Successfully",
            status: "OK",
            statusCode: httpStatus.CREATED,
            data: result,
        })
    );

    return;

});
const updateCareerEvent = catchAsync(async (req, res) => {
    if (req.files.image) {
        req.body.image = `/uploads/career/` + req.files.image[0].filename;
    }
    if (req.files.blogImage) {
        req.body.blogImage = `/uploads/career/` + req.files.blogImage[0].filename;
    }
    const result = await careerEventService.updateCareerEvent(req.params.id, req.body);
    res.status(httpStatus.OK).json(
        response({
            message: "Career Event Updated Successfully",
            status: "OK",
            statusCode: httpStatus.OK,
            data: result,
        })
    );
})
const getAllCareerEvents = catchAsync(async (req, res) => {
    const result = await careerEventService.getAllCareerEvents();
    res.status(httpStatus.OK).json(
        response({
            message: "All Career Events",
            status: "OK",
            statusCode: httpStatus.OK,
            data: result,
        })
    );
});
const getCareerEventById = catchAsync(async (req, res) => {
    const result = await careerEventService.getCareerEventById(req.params.id);
    res.status(httpStatus.OK).json(
        response({
            message: "Career Event",
            status: "OK",
            statusCode: httpStatus.OK,
            data: result,
        })
    );
});

module.exports = {
    createCareerEvent,
    updateCareerEvent,
    getAllCareerEvents,
    getCareerEventById
    // add other methods as needed
};
