const invModel = require("../models/inventory-model.js");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassification();

  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.buildInventoryCarDetails = async function (data) {
  let card;
  if (data) {
    card = ` <div class="car-detail">
      <div>
        <img src="${data.inv_image}" alt="${data.inv_make}" />
      </div>
      <div>
        <h3>${data.inv_make} Details</h3>       
        <p class="price"><span>Price:</span> $${new Intl.NumberFormat(
          "en-US"
        ).format(data.inv_price)}</p>
        <p><span>Description:</span> ${data.inv_description}</p>
        <p><span>Color:</span> ${data.inv_color}</p>
        <p><span>Miles:</span> ${new Intl.NumberFormat("en-US").format(
          data.inv_miles
        )}</p>
      </div>
    </div>`;
  } else {
    card = `<p class="notice">Sorry, no matching vehicles could be found.</p>`;
  }

  return card;
};

Util.handleErrors = function (controllerFunction) {
  return async function (req, res, next) {
    try {
      await controllerFunction(req, res, next);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      const status = err.status || 500;
      // Render an error view with a meaningful error message
      res.status(status).render("errors/error", {
        title: "Error",
        message: err.message || "An unexpected error occurred",
      });
    }
  };
};

module.exports = Util;
