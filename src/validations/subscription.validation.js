const Joi = require('joi');

const createSubscription = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        subType: Joi.string().required(),
        features: Joi.array().items(Joi.string()).required(),
    }),
};

module.exports = ({
    createSubscription
})


// using this
// {
//     "name": "primium",
//     "price": 0,
//     "subType": "weekly", //  weekly , monthly . yearly
//     "featurs": [
//         "nerob",
//         "Rakib"
//     ]
// }