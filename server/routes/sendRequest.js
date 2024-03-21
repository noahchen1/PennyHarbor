const { client } = require("../db");

const sendRequest = async (req, res) => {
  const { account_id, shared_with_email } = req.body;
  const status = false;

  try {
    const insertQuery = {
      text: "INSERT INTO permissions (expense_creator_account_id, shared_with_email, permission) VALUES ($1, $2, $3) RETURNING *",
      values: [account_id, shared_with_email, status],
    };

    const selectQuery = {
      text: `SELECT * FROM permissions WHERE shared_with_email = $1`,
      values: [shared_with_email],
    };

    const result = await client.query(insertQuery);
    const content = await client.query(selectQuery);

    res.json({ success: true, expenses: content.rows });
  } catch (error) {
    console.error("Error sending request", error);
    res
      .status(500)
      .json({ success: false, error: `Failed to send request: ${error}` });
  }
};

module.exports = { sendRequest };
