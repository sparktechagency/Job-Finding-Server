const express = require("express");
const jobController = require("../../controllers/jobs.controller");
const auth = require("../../middlewares/auth");
const jobValidation = require("../../validations/jobs.validation");
const validate = require("../../middlewares/validate");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/users";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

router
    .route("/create")
    .post(auth("common"), validate(jobValidation.createJob), jobController.createJob)
router
    .route("/all")
    .get(auth("common"), jobController.getJobs);
router
    .route("/get/:id")
    .get(auth("common"), jobController.getJobById);

router
    .route("/create-application")
    .post(
        auth("common"),
        validate(jobValidation.applicationValidation),
        uploadUsers.fields([
            { name: "cv", maxCount: 5 },  // multiple images, up to 5
            { name: "coverLetter", maxCount: 5 },
            { name: "sortVideo", maxCount: 5 }
        ]),
        convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
        jobController.createApplication);

router
    .route("/bookmark")
    .post(auth("common"), jobController.bookmarkJob);


module.exports = router;