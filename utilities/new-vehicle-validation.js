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

// New Inventory entry validation
validateVehicle.addInventoryRules = () => {
  return [
    // class_name is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('valid "Make" name required'),

    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('valid "Model" name required'),

    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("text is too small to be a description"),

    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .withMessage(
        "valid price required Hint:(numeric only no letters allowed) etc"
      ),

    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage("Input must be exactly 4 digits.")
      .isNumeric()
      .withMessage("Only numeric characters are allowed."),

    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("valid miles is required")
      .custom((value) => {
        if (value.includes(".") || value.includes(",")) {
          throw new Error("Decimals or commas are not allowed");
        }
        return true;
      }),

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("valid color required"),
  ];
};

/* ******************************
 * Check data and return errors or continue to Adding Inventory
 * ***************************** */
validateVehicle.checkInevtoryData = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body;

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Inventory",
      nav,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validateVehicle;
