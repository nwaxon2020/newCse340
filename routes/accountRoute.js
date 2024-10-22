const express = require("express");
const accountRouter = new express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");
const router = require("./static");

// Route to handle "My Account" link (GET request)
accountRouter.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
);

// Process the login request
accountRouter.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Route to handle "My Register" link (GET request)
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

accountRouter.get(
  "/account",
  utilities.checkLogin,
  utilities.handleErrors(accountController.account)
);

module.exports = accountRouter;
