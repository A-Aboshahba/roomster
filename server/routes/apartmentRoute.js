const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartmentController");
const validationError = require("./../middelwares/validators/validationError");
const validator = require("./../middelwares/validators/apartmentValidator");
const authMiddleware = require("./../middelwares/authenicatedMW");
router.route("/").post(
  authMiddleware.verifyTokenAndAuthorization,
  // validator.postValidationArr,
  // validationError,
  apartmentController.addNewApartment
);
router.get("/all", apartmentController.getAllApartments);
router.patch(
  "/:id",
  authMiddleware.verifyTokenAndAuthorization,
  validator.putValidationArr,
  validationError,
  apartmentController.updateApartment
);
router.patch(
  "/:id/imgs",
  apartmentController.upload.array("images", 10),
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,

  apartmentController.addMultipleImages
);
router.delete(
  "/:id",
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.deleteApartment
);

router.get(
  "/:id",
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.getApartmentById
);
// router.patch(
//   authMiddleware.verifyToken,
//   "/:id/rent",
//   validator.getSpecifiedApartmentById,
//   validationError,
//   (request, response, next) => {
//     response.status(200).json("rent apartments");
//   }
// );
router.patch(
  "/:id/image",
  apartmentController.upload.single("image"),
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.addSingleImage
);
router.delete(
  "/:id/image",
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.removeSingleImage
);
module.exports = router;
