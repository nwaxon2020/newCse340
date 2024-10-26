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

  const classificationSelect = await utilities.buildClassificationList();

  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationSelect,
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
    classification_name[0]
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

// Inventory Build for new inventory
invCont.buildNewInventory = async function (req, res, next) {
  try {
    const choices = await utilities.buildClassificationList();
    let nav = await utilities.getNav();
    res.render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      choices,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

/* ****************************************
 *  Process Adding Inventory
 * *************************************** */
invCont.addNewInventory = async function (req, res) {
  let nav = await utilities.getNav();
  const choices = await utilities.buildClassificationList();
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

  const addInventoryResult = await addClassModel.addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  );

  if (addInventoryResult) {
    req.flash(
      "add-class-error",
      `<span>${inv_make}</span> was added successfuly!`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationSelect: choices,
    });
  } else {
    req.flash("add-class-error", "Sorry, the registration failed.");
    res.status(501).render(".inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      choices,
      errors: null,
    });
  }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  );

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model;
    req.flash("notice", `The ${itemName} was successfully updated.`);
    res.redirect("/site-name/inv");
  } else {
    const choices = await utilities.buildClassificationList(); // Ensure `choices` is populated
    const itemName = `${inv_make} ${inv_model}`;

    req.flash("notice", "Sorry, the update failed.");
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      choices,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
};

/* ****************************************
 *  Process Editing Inventory
 * *************************************** */
// Inventory Build for new inventory
invCont.buildEdit = async function (req, res, next) {
  try {
    const inventory_id = parseInt(req.params.inv_id);
    let nav = await utilities.getNav();
    const invData = await invModel.getInventoryByDetails(inventory_id);

    if (!invData || invData.length === 0) {
      throw new Error("Inventory data not found for the given ID");
    }

    // Define classification_id from invData
    const classification_id = invData[0].classification_id;
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    );

    const invName = `${invData[0].inv_make} ${invData[0].inv_model}`;

    res.render("inventory/edit-inventory", {
      title: invName,
      nav,
      choices: classificationSelect,
      errors: null,
      inv_id: invData[0].inv_id,
      inv_make: invData[0].inv_make,
      inv_model: invData[0].inv_model,
      inv_year: invData[0].inv_year,
      inv_description: invData[0].inv_description,
      inv_image: invData[0].inv_image,
      inv_thumbnail: invData[0].inv_thumbnail,
      inv_price: invData[0].inv_price,
      inv_miles: invData[0].inv_miles,
      inv_color: invData[0].inv_color,
      classification_id: invData[0].classification_id,
    });
  } catch (error) {
    next(error);
  }
};

/* ****************************************
 *  Process deletr Inventory
 * *************************************** */
// Inventory view for delete inventory
invCont.buildDelete = async function (req, res, next) {
  try {
    const inventory_id = parseInt(req.params.inv_id);
    let nav = await utilities.getNav();
    const invData = await invModel.getInventoryByDetails(inventory_id);

    if (!invData || invData.length === 0) {
      throw new Error("Inventory data not found for the given ID");
    }

    const invName = `${invData[0].inv_make} ${invData[0].inv_model}`;

    res.render("inventory/delete-confirm", {
      title: invName,
      nav,
      errors: null,
      inv_id: invData[0].inv_id,
      inv_make: invData[0].inv_make,
      inv_model: invData[0].inv_model,
      inv_year: invData[0].inv_year,
      inv_price: invData[0].inv_price,
    });
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Delete Inventory Data
 * ************************** */
invCont.deletInv = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { inv_id } = req.body;

  const vehicleDetails = await invModel.getInventoryByDetails(inv_id);
  const deleteResult = await invModel.deleteInventory(inv_id);

  if (deleteResult) {
    const itemName = `${vehicleDetails[0].inv_make} ${vehicleDetails[0].inv_model}`;
    req.flash("notice", `The ${itemName} was successfully DELETED.`);
    res.redirect("/site-name/inv");
  } else {
    const choices = await utilities.buildClassificationList(); // Ensure `choices` is populated
    console.log("Choices:", choices);
    const itemName = `${inv_make} ${inv_model}`;

    req.flash("notice", "Sorry, the DELETE failed.");
    res.redirect("/site-name/inv/delete-confirm");
  }
};
// Erroe Handling
invCont.buildError = async function (req, res, next) {
  const error = new Error("This is a Server Error.");
  error.status = 500; // Set the error status code
  next(error); // Pass the error to the next middleware
};

module.exports = invCont;
