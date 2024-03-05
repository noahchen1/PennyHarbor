const { client } = require("../db");

const addCatagory = async (req, res) => {
  try {
    const { username, category, iconname, icontype, color } = req.body;
    const query = {
      text: "INSERT INTO catagories (username, category, iconname, icontype, color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [username, category, iconname, icontype, color],
    };
    const result = await client.query(query);

    res.json({ success: true, expense: result.rows[0] });
  } catch (error) {
    console.error("Error adding catagory", error);
    res.status(500).json({ success: false, error: `failed to add catagory: ${error}` });
  }
};

module.exports = { addCatagory };
