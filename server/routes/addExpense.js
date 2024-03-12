const { client } = require("../db");

const addExpense = async (req, res) => {
  try {
    const { username, text, value, color, date } = req.body;
    const insertQuery = {
      text: "INSERT INTO expenses (username, text, value, color, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [username, text, value, color, date],
    };

    const selectQuery = {
      text: "SELECT * FROM expenses",
    };

    const result = await client.query(insertQuery);
    const content = await client.query(selectQuery);

    res.json({ success: true, expense: content.rows });
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ success: false, error: "Failed to add expense" });
  }
};

module.exports = { addExpense };
