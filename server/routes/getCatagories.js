const { client } = require("../db");

const getCategories = async (req, res) => {
  const { username } = req.params;

  try {
    const query = {
      text: "SELECT * FROM catagories WHERE username = $1",
      values: [username],
    };

    const result = await client.query(query);

    res.json({ success: true, categories: result.rows });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getCategories };
