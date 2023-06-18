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
    // clear favourites array
    verifyTokenAndAuthorization,
    validator.clearFavourites,
    validationError,
    controller.clearFavourites
  );
router
  .route("/:id/image")
  .post(
    verifyTokenAndAuthorization,
    validator.addProfileImage,
    validationError,
    controller.upload.single("image"),
    controller.addProfileImage
  )
  .delete(
    verifyTokenAndAuthorization,
    validator.deleteProfileImage,
    validationError,
    controller.deleteProfileImage
  );
router
  .route("/:id/reservations")
  .get(
    verifyTokenAndAuthorization,
    validator.getUserReservations,
    validationError,
    controller.getUserReservations
  );
router.route("/reservations/all").get(isAdmin, controller.getAllReservations);
router
  .route("/reservation/:id")
  .get(
    verifyTokenAndAuthorization,
    validator.getSingleReservations,
    validationError,
    controller.getSingleReservations
  );
module.exports = router;
