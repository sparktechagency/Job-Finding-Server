// subscription
const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const router = express.Router();
const subscriptionValidation = require("../../validations/subscription.validation");
const subscriptionController = require("../../controllers/subscription.controller");

router
    .route("/create")
    .post(auth("common"), validate(subscriptionValidation.createSubscription), subscriptionController.createSubscription);

router
    .route("/all")
    .get(auth("common"), subscriptionController.getSubscriptions);

router
    .route("/:id")
    .get(auth("common"), subscriptionController.getSingleSubscriptions);

router
    .route("/update/:id")
    .patch(auth("common"), subscriptionController.updateSubscription);

router
    .route("/:id")
    .delete(auth("common"), subscriptionController.deleteSubscription);



module.exports = router; 