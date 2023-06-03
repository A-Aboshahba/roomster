const { param, body } = require("express-validator");
module.exports.getSingleUser = param("id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");
module.exports.deleteSingleUser = param("id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");

module.exports.updateSingleUser = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("firstName")
    .notEmpty()
    .withMessage("firstName cant be blank")
    .isString()
    .withMessage("firstName must be alphapetic")
    .optional(),
  body("lastName")
    .notEmpty()
    .withMessage("lastName cant be blank")
    .isString()
    .withMessage("lastName must be alphapetic")
    .optional(),
  body("fullName")
    .notEmpty()
    .withMessage("fullName cant be blank")
    .isString()
    .withMessage("fullName must be alphapetic")
    .optional(),
  body("password")
    .isString()
    .withMessage("password must be alphapetic")
    .notEmpty()
    .withMessage("password cant be blank")
    .optional(),
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("enter valid email")
    .optional(),
  body("address.country")
    .isString()
    .withMessage("country must be alphapetic")
    .notEmpty()
    .withMessage("country cant be blank")
    .optional(),
  body("address.city")
    .isString()
    .withMessage("city must be alphapetic")
    .notEmpty()
    .withMessage("city cant be blank")
    .optional(),
];
module.exports.getFavourites = param("id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");

module.exports.addFavourite = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("apartmentId").isMongoId().withMessage("id must be mongo ObjectId"),
];
module.exports.removeFavourite = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("apartmentId").isMongoId().withMessage("id must be mongo ObjectId"),
];

module.exports.clearFavourites = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
];
module.exports.addProfileImage = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
];
module.exports.deleteProfileImage = [
  param("id").isMongoId().withMessage("id must be mongo ObjectId"),
];
