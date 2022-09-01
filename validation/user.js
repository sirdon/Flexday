const { check } = require("express-validator");
exports.userListValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Enter valid email address"),
  check("dob").not().isEmpty().withMessage("dob is required"),
  check("address").not().isEmpty().withMessage("address is required"),
];
exports.getUserValidation = [
  check("id").not().isEmpty().withMessage("id is required"),
];
