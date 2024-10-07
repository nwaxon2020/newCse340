const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build single car
router.get("/detail/:invId", invController.buildByInvId);

//Error handeling
router.get("/trigger-error", (req, res, next) => {
  const error = new Error("This is a Server Error.");
  error.status = 500; // Set the error status code
  next(error); // Pass the error to the next middleware
});

module.exports = router;
