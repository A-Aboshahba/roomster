const express = require("express");
const router = express.Router();
const controller = require("../controllers/messageController");
const validator = require("./../middelwares/validators/messageValidator");
const validationError = require("./../middelwares/validators/validationError");
const authMiddleware = require("./../middelwares/authenicatedMW");

router
  .route("/:id")
  .get(
    authMiddleware.verifyTokenAndAuthorization,
    validator.getConvoMessages,
    validationError,
    controller.getConvoMessages
  )
  .post(
    authMiddleware.verifyTokenAndAuthorization,
    validator.addNewMessage,
    validationError,
    controller.addNewMessage
  );

module.exports = router;
