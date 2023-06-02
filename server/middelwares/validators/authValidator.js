const { param, body } = require("express-validator");

module.exports.login = [
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isString()
    .withMessage("email must be alphapetic"),
  body("password")
    .isString()
    .withMessage("password must be alphapetic")
    .notEmpty()
    .withMessage("password cant be blank"),
];

module.exports.signup = [
  body("firstName")
    .notEmpty()
    .withMessage("firstName cant be blank")
    .isString()
    .withMessage("firstName must be alphapetic"),
  body("lastName")
    .notEmpty()
    .withMessage("lastName cant be blank")
    .isString()
    .withMessage("lastName must be alphapetic"),
  body("fullName")
    .notEmpty()
    .withMessage("fullName cant be blank")
    .isString()
    .withMessage("fullName must be alphapetic"),
  body("password")
    .isString()
    .withMessage("password must be alphapetic")
    .notEmpty()
    .withMessage("password cant be blank"),
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("enter valid email"),
  body("image")
    .isString()
    .withMessage("image must be alphapetic")
    .notEmpty()
    .withMessage("image cant be blank"),
  body("address.country")
    .isString()
    .withMessage("country must be alphapetic")
    .notEmpty()
    .withMessage("country cant be blank"),
  body("address.city")
    .isString()
    .withMessage("city must be alphapetic")
    .notEmpty()
    .withMessage("city cant be blank"),
];
