const Joi = require("joi");


const createCareerEvent = {
    body: Joi.object().keys({
        name: Joi.string(),
        image: Joi.string(),
        titleofBlog: Joi.string(),
        blogImage: Joi.string(),
        details: Joi.string(),
    }),
};

module.exports = ({
    createCareerEvent
})