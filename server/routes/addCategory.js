const { client } = require("../db");

const addCategory = async (req, res) => {
  try {
    const { username, category, iconname, icontype, color } = req.body;

    const insertQuery = {
      text: "INSERT INTO catagories (username, category, iconname, icontype, color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [username, category, iconname, icontype, color],
    };

    const selectQuery = {
      text: "SELECT * FROM catagories",
    };
    const result = await client.query(insertQuery);

    const content = await client.query(selectQuery);

    res.json({ success: true, expense: content.rows });
  } catch (error) {
    console.error("Error adding catagory", error);
    res
      .status(500)
      .json({ success: false, error: `failed to add catagory: ${error}` });
  }
};

module.exports = { addCategory };
