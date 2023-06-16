const { query, param, body } = require("express-validator");

exports.postValidationArr = [
  body("userId").isMongoId().withMessage("name is not valid object id "),
  body("apartmentSpecification.noOfBalcony")
    .isNumeric()
    .withMessage("noOfBalcony is't number  "),
  body("apartmentSpecification.noOfRooms")
    .isNumeric()
    .withMessage("noOfRooms isn't number  "),
  body("apartmentSpecification.noOfBeds")
    .isNumeric()
    .withMessage("noOfBeds isn't number  "),

  body("apartmentSpecification.hasKitchen")
    .isBoolean()
    .withMessage("hasKitchen isn't boolean "),
  body("apartmentSpecification.hasWifi")
    .isBoolean()
    .withMessage("hasWifi isn't boolean "),
  body("price").isNumeric().withMessage("price isn't number"),
  body("type").isString().withMessage("type isn't String "),
  body("location.country").isString().withMessage("country isn't String "),
  body("location.city").isString().withMessage("city isn't String "),
  body("location.street").isString().withMessage("street isn't String "),
  body("location.description")
    .isString()
    .withMessage("description isn't String "),
  body("location.building").isNumeric().withMessage("building isn't number  "),
  body("location.floorNo").isNumeric().withMessage("floorNo isn't number "),
  body("reservationInfo.startDate").custom((value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("startDate is not a valid date");
    }
    return true;
  }),
  body("reservationInfo.endDate").custom((value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("startDate is not a valid date");
    }
    return true;
  }),
  body("reservationInfo.totalPrice")
    .isNumeric()
    .withMessage("totalPrice isn't number")
    .optional(),
  body("reservationInfo.guestId")
    .isMongoId()
    .withMessage("guestId is not valid object id ")
    .optional(),
];

exports.putValidationArr = [
  body("userId")
    .notEmpty()
    .withMessage("user Id is empty")
    .isMongoId()
    .withMessage("name is not valid object id "),
  body("apartmentSpecification.noOfBalcony")
    .notEmpty()
    .withMessage("noOfBalcony is empty")
    .isNumeric()
    .withMessage("noOfBalcony is't number  ")
    .optional(),
  body("apartmentSpecification.noOfRooms")
    .isEmpty()
    .withMessage("noOfRooms is empty")
    .isNumeric()
    .withMessage("noOfRooms isn't number")
    .optional(),
  body("apartmentSpecification.noOfBeds")
    .isEmpty()
    .withMessage("noOfBeds is empty")
    .isNumeric()
    .withMessage("noOfBeds isn't number  ")
    .optional(),
  body("price").isNumeric().withMessage("price isn't number  ").optional(),
  body("apartmentSpecification.hasKitchen")
    .isBoolean()
    .withMessage("hasKitchen isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasWifi")
    .isBoolean()
    .withMessage("hasWifi isn't boolean ")
    .optional(),
  body("type").isString().withMessage("type isn't String ").optional(),
  body("location.country")
    .isString()
    .withMessage("country isn't String ")
    .optional(),
  body("location.city").isString().withMessage("city isn't String ").optional(),
  body("location.street")
    .isString()
    .withMessage("street isn't String ")
    .optional(),
  body("location.description")
    .isString()
    .withMessage("description isn't String ")
    .optional(),
  body("location.building")
    .isNumeric()
    .withMessage("building isn't number  ")
    .optional(),
  body("location.floorNo")
    .isNumeric()
    .withMessage("floorNo isn't number  ")
    .optional(),
  body("reservationInfo.startDate")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("startDate is not a valid date");
      }
      return true;
    })
    .optional(),
  //   body("reservationInfo.endDate")
  //     .isDate()
  //     .withMessage("endDate isn't date")
  //     .optional()
  body("reservationInfo.endDate")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("endDate is not a valid date");
      }
      return true;
    })
    .optional(),
  body("reservationInfo.totalPrice")
    .isNumeric()
    .withMessage("totalPrice isn't number")
    .optional(),
  body("reservationInfo.guestId")
    .isMongoId()
    .withMessage("guestId is not valid object id ")
    .optional(),
];

exports.getSpecifiedApartmentById = [
  param("id").isMongoId().withMessage("id is object id"),
];
