const Joi = require("joi");


const sendEmail = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        title: Joi.string().required(),
        message: Joi.string().required(),
    }),
};


const sendNewsletters = {
    body: Joi.object().keys({
        email: Joi.string().required(), 
    }),
};


module.exports = {
    sendEmail,
    sendNewsletters,
};