const express = require("express");
const vehicleManagementRouter = new express.Router();
const utilities = require("../utilities/index");
const invController = require("../controllers/invController");
const addClassValidate = require("../utilities/new-vehicle-validation");

// Route to build Vehicle Management
vehicleManagementRouter.get(
  "/inv",
  utilities.handleErrors(invController.buildVehicleManagement)
);

// Route to build add class
vehicleManagementRouter.get(
  "/add-classification",
  utilities.handleErrors(invController.buildNewClass)
);

// Route to past add Class
vehicleManagementRouter.post(
  "/add-classification",
  addClassValidate.addClassificationRules(),
  addClassValidate.checkClassData,
  utilities.handleErrors(invController.addNewClass)
);

///////////////////////////////////////////////////////////////////
// Route to build add inventory
vehicleManagementRouter.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildNewInventory)
);

// Route to past add inventory
vehicleManagementRouter.post(
  "/add-inventory",
  addClassValidate.addInventoryRules(),
  addClassValidate.checkInevtoryData,
  utilities.handleErrors(invController.addNewInventory)
);

//Route to build POST Update
vehicleManagementRouter.post(
  "/update",
  addClassValidate.addInventoryRules(),
  addClassValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

module.exports = vehicleManagementRouter;
