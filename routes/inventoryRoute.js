const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

//Route to build single car
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInvId)
);

//Error handeling
router.get("/trigger-error", invController.buildError);

module.exports = router;
