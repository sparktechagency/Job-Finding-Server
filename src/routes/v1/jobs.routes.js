const express = require("express");
const jobController = require("../../controllers/jobs.controller");
const auth = require("../../middlewares/auth");
const jobValidation = require("../../validations/jobs.validation");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
    .route("/create")
    .post(auth("commonCompanyAdmin"), validate(jobValidation.createJob), jobController.createJob)
router
    .route("/all")
    .get(auth("common"), jobController.getJobs);
router
    .route("/get/:id")
    .get(auth("common"), jobController.getJobById);


module.exports = router;