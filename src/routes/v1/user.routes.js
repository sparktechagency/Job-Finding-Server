const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/users";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

router.route("/self/in").get(auth("common"), userController.getProfile);

router
  .route("/self/update")
  .patch(
    auth("common"),
    validate(userValidation.updateUser),

    uploadUsers.fields([
      { name: "image", maxCount: 5 },  // multiple images, up to 5
      { name: "myCv", maxCount: 1 },
      { name: "portfolio", maxCount: 1 }
    ]),
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    
    userController.updateProfile
  );


router
  .route("/following-company")
  .post(auth("common"), userController.followCompany);




module.exports = router;
