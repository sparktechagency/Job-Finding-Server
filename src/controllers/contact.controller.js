const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const contactService = require("../services/contact.service");


const createContact = catchAsync(async (req, res) => {
    const { title, email, message } = req.body;
    const contact = await contactService.createContact(title, email, message);

    res.status(httpStatus.CREATED).json(
        response({
            message: "Contact Created Successfully",
            status: "OK",
            statusCode: httpStatus.CREATED,
        })
    );
});


const sendNewsletters = catchAsync(async (req, res) => {
    const newsletters = await contactService.sendNewsletters(email = req.body.email);

    res.status(httpStatus.OK).json(
        response({
            message: "Newsletters Sent Successfully",
            status: "OK",
            statusCode: httpStatus.OK,
            data: newsletters,
        })
    );
});

const getNewsletters = catchAsync(async (req, res) => {
    const newsletters = await contactService.getNewsletters();

    res.status(httpStatus.OK).json(
        response({
            message: "Newsletters Retrieved Successfully",
            status: "OK",
            statusCode: httpStatus.OK,
            data: newsletters,
        })
    );
});



module.exports = {
    createContact,
    sendNewsletters,
    getNewsletters
};