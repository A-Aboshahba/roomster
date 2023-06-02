const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const validator = require("../middelwares/validators/userValidator");
const validationError = require("../middelwares/validators/validationError");
const {
  isAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("./../middelwares/authenicatedMW");

router.route("/all").get(isAdmin, controller.getAllUsers);
router
  .route("/:id")
  .get(validator.getSingleUser, validationError, controller.getSingleUser)
  .patch(
    verifyTokenAndAuthorization,
    validator.updateSingleUser,
    validationError,
    controller.updateSingleUser
  )
  .delete(
    verifyTokenAndAuthorization,
    validator.deleteSingleUser,
    validationError,
    controller.deleteSingleUser
  );
router
  .route("/:id/favourites")
  .get(
    verifyTokenAndAuthorization,
    validator.getFavourites,
    validationError,
    controller.getFavourites
  )
  .post(
    verifyTokenAndAuthorization,
    validator.addFavourite,
    validationError,
    controller.addFavourite
  )
  .put(
    //remove single favourite from favourites
    verifyTokenAndAuthorization,
    validator.removeFavourite,
    validationError,
    controller.removeFavourite
  )
  .delete(
    verifyTokenAndAuthorization,
    validator.clearFavourites,
    validationError,
    controller.clearFavourites
  );

module.exports = router;
