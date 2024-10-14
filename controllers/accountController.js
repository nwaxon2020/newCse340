const utilities = require("../utilities/index");

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("accounts/login", {
    title: "Login",
    nav,
  });
}

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("accounts/register", {
    title: "Register",
    nav,
  });
}

module.exports = { buildLogin, buildRegister };
