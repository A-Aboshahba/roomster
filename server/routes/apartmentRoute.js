const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartmentController");
const validationError = require("../middlewares/validators/validationError");
const validator = require("../middlewares/validators/apartmentValidator");
const authMiddleware = require("../middlewares/authenicatedMW");
router
  .route("/")
  .post(
    authMiddleware.verifyTokenAndAuthorization,
    validator.postValidationArr,
    validationError,
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
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.upload.array("images", 10),
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
  authMiddleware.verifyTokenAndAuthorization,
  validator.getSpecifiedApartmentById,
  validationError,
  apartmentController.upload.single("image"),
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
