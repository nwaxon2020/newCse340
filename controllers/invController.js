const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

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

invCont.buildError = async function (req, res, next) {
  const error = new Error("This is a Server Error.");
  error.status = 500; // Set the error status code
  next(error); // Pass the error to the next middleware
};

module.exports = invCont;
