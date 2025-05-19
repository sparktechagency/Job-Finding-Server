
// this is a contact service useing nodemailer 

const { sendEmailContact } = require("./email.service");
const Newslatter = require("../models/newsletter.model");
const ApiError = require("../utils/ApiError");


const createContact = async (title, email, message) => {


    // Validate input
    if (!title || !email || !message) {
        return res.status(400).json({
            status: "FAILED",
            message: "All fields are required",
        });
    }
    // Send email logic here
    // to, titile, message
    await sendEmailContact(email, title, message);


    // For example, using nodemailer

    // Return success response
    return {
        status: "OK",
        message: "Email sent successfully",
    };
}

const sendNewsletters = async (email) => {
    // create a new newsletter

    // Validate input
    if (!email) {
        return res.status(400).json({
            status: "FAILED",
            message: "Email is required",
        });
    }
    if (email) {
        const existingNewsletter = await Newslatter.findOne({ email: email });
        const message = "Email already exists";
        // Check if the email already exists in the database
        if (existingNewsletter) {
            throw new ApiError(400, message);
        }
    }

    const createNewsletter = await Newslatter.create({
        email: email,
    });

    // Return the newsletters
    return createNewsletter;
}

const getNewsletters = async () => {
    const newsletters = await Newslatter.find();
    if (!newsletters) {
        throw new ApiError(404, "No newsletters found");
    }

    return newsletters;
}


module.exports = {
    createContact,
    sendNewsletters,
    getNewsletters
}

