const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validateVehicle = {};
const accountModel = require("../models/addClass-model");

validateVehicle.addClassificationRules = () => {
  return [
    // class_name is required and must be string
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .matches(/^[A-Za-z]+$/)
      .withMessage("Please provide a valid class name")
      .custom(async (classification_name) => {
        const classExists = await accountModel.checkExistingClassName(
          classification_name
        );
        if (classExists) {
          throw new Error(
            "Classification Name already exists!!! Please use a different Classification name"
          );
        }
      }),
  ];
};

/* ******************************
 * Check data and return errors or continue to Adding Classification
 * ***************************** */
validateVehicle.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validateVehicle;
