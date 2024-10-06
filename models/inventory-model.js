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

module.exports = { getClassification, getInventoryByClassificationId };
