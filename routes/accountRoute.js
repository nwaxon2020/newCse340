const express = require("express");
const accountRouter = new express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to handle "My Account" link (GET request)
accountRouter.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
);
accountRouter.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Route Post request method
accountRouter.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,

  utilities.handleErrors(accountController.registerAccount)
);

module.exports = accountRouter;
