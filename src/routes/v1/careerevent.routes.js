const express = require("express");
const validate = require("../../middlewares/validate");
const { careerEventValidation } = require("../../validations");
const auth = require("../../middlewares/auth");
const { careerEventController } = require("../../controllers");
const router = express.Router();
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const UPLOADS_FOLDER_USERS = "./public/uploads/career";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

router.post("/create",
    auth("common"),
    validate(careerEventValidation.createCareerEvent),
    uploadUsers.fields([
        { name: "image", maxCount: 1 },  // single image upload
        { name: "blogImage", maxCount: 1 },  // single video upload 
    ]),
    careerEventController.createCareerEvent
);
router.patch("/update/:id",
    auth("common"),
    // validate(careerEventValidation.createCareerEvent),
    uploadUsers.fields([
        { name: "image", maxCount: 1 },  // single image upload
        { name: "blogImage", maxCount: 1 },  // single video upload 
    ]),
    careerEventController.updateCareerEvent
);

router.get("/all",
    auth("common"),
    careerEventController.getAllCareerEvents
);
router.get("/get/:id",
    auth("common"),
    careerEventController.getCareerEventById
);


module.exports = router;