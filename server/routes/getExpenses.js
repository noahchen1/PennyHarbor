const { client } = require("../db");

const getExpenses = async (req, res) => {
  const { username } = req.params;

  try {
    const query = {
      text: "SELECT * FROM expenses WHERE username = $1",
      values: [username],
    };

    const result = await client.query(query);

    res.json({ success: true, expenses: result.rows });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getExpenses };
