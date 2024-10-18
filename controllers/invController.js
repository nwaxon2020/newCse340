const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const addClassModel = require("../models/addClass-model");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId;
  const data = await invModel.getInventoryByDetails(inv_id);
  const card = await utilities.buildInventoryCarDetails(data[0]);
  let nav = await utilities.getNav();
  const vehicleName = data[0].inv_make;
  const vehicleYear = data[0].inv_year;

  res.render("./inventory/vehicle", {
    title: `${vehicleYear} ${vehicleName}`,
    card,
    nav,
  });
};

// Inventory Build for Vehicle Management
invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
  });
};

// Inventory Build for new Classification
invCont.buildNewClass = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Process Adding Classification
 * *************************************** */
invCont.addNewClass = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const addClassResult = await addClassModel.addClassification(
    classification_name
  );

  if (addClassResult) {
    req.flash(
      "add-class-error",
      `<span>${classification_name}</span> was added successfuly!`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    });
  } else {
    req.flash("add-class-error", "Sorry, the registration failed.");
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
    });
  }
};

// Erroe Handling
invCont.buildError = async function (req, res, next) {
  const error = new Error("This is a Server Error.");
  error.status = 500; // Set the error status code
  next(error); // Pass the error to the next middleware
};

module.exports = invCont;
