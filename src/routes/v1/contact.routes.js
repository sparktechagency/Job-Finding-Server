const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const contactValidation = require("../../validations/contact.validation");
const contactController = require("../../controllers/contact.controller");

const router = express.Router();
router
    .route("/send-email")
    .post(auth("common"), validate(contactValidation.sendEmail), contactController.createContact)
router
    .route("/newsletter")
    .post(auth("common"), validate(contactValidation.sendNewsletters), contactController.sendNewsletters);

router
    .route("/newsletter")
    .get(auth("common"), contactController.getNewsletters);




module.exports = router;