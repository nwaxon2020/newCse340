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

module.exports = vehicleManagementRouter;
