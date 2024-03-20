const { client } = require("../db");

const snedRequest = async (req, res) => {
  const { account_id, shared_with_user_email } = req.body;

  try {
    const insertQuery = {
      text: "INSERT INTO permission (account_id, shared_with_user_email) VALUES ($1, $2) RETURNING *",
      value: [account_id, shared_with_user_email],
    };

    const selectQuery = {
      text: `SELECT * FROM permission WHERE shared_with_user_email = ${shared_with_user_email}`,
    };

    const result = await client.query(insertQuery);
    const content = await client.query(selectQuery);

    res.json({ success: true, expenses: content.rows });
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ success: false, error: "Failed to add expense" });
  }
};
