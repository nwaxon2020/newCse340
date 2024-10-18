const pool = require("../database");

// Add New classification
async function addClassification(class_name) {
  try {
    const sql =
      "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    return await pool.query(sql, [class_name]);
  } catch (error) {
    return error.message;
  }
}

/* **********************
 *   Check for existing classification name
 * ********************* */
async function checkExistingClassName(class_name) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1";
    const classification = await pool.query(sql, [class_name]);
    return classification.rowCount;
  } catch (error) {
    return error.message;
  }
}
module.exports = { addClassification, checkExistingClassName };
