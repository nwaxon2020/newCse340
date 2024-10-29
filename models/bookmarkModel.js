const pool = require("../database"); // Adjust path if needed

async function addBookmark(inv_id) {
  try {
    const sql = `INSERT INTO bookmarks (inv_id) VALUES ($1) RETURNING *;`;
    const result = await pool.query(sql, [inv_id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
}

module.exports = { addBookmark };
