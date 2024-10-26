const pool = require("../database/");

async function getClassification() {
  try {
    const res = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    );
    return res;
  } catch (error) {
    console.error("error getting result", error);
    throw error;
  }
}

async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

async function getInventoryByDetails(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inv_id = $1`,
      [inv_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByDetails error " + error);
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *";
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id,
    ]);
    return data.rows[0];
  } catch (error) {
    console.error("model error: " + error);
  }
}

/* ***************************
 *  Delete Inventory Data
 * ************************** */
async function deleteInventory(inv_id) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1";
    const data = await pool.query(sql, [inv_id]);
    return data.rowCount > 0;
  } catch (error) {
    console.error("model error: " + error);
  }
}

module.exports = {
  getClassification,
  getInventoryByClassificationId,
  getInventoryByDetails,
  updateInventory,
  deleteInventory,
};
