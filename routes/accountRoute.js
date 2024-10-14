const express = require("express");
const accountRouter = new express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accountController");

// Route to handle "My Account" link (GET request)
accountRouter.get("/login", accountController.buildLogin);

// Error handler middleware
accountRouter.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).send(err.message);
});

module.exports = accountRouter;
