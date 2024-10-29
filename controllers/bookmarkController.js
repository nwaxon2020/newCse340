// controllers/bookmarkController.js
const bookmarkModel = require("../models/bookmarkModel");

const bookmarkController = {};

// Bookmark a vehicle by inv_id only
bookmarkController.addBookmark = async (req, res, next) => {
  try {
    const inv_id = req.body.inv_id; // No user_id involved, only inv_id

    const result = await bookmarkModel.addBookmark(inv_id); // Model only needs inv_id
    if (result) {
      req.flash("notice", "Vehicle bookmarked successfully.");
    } else {
      req.flash("error", "Failed to bookmark vehicle.");
    }
    res.redirect("back"); // Redirects to the previous page
  } catch (error) {
    next(error);
  }
};

bookmarkController.getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await bookmarkModel.getAllBookmarks(); // Implement this in your model
    res.render("bookmarks", { bookmarks }); // Adjust to your view
  } catch (error) {
    next(error);
  }
};

module.exports = bookmarkController;
