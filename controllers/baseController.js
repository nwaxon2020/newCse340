const utilities = require("../utilities/index.js");
const baseController = {};

baseController.buildHome = async function (req, res) {
  console.log("This is the rer.flass msg: " + req.flash);
  const nav = await utilities.getNav();
  req.flash("notice", "This is a flash message.");
  res.render("index", { title: "Home", nav });
};

module.exports = baseController;
