const { escapeIdentifier } = require("pg");
const { client } = require("../db");

const getExpenses = async (req, res) => {
  const { email } = req.params;

  try {
    const userAccountQuery = {
      text: "SELECT id FROM useraccount WHERE email = $1",
      values: [email],
    };

    const permissionsQuery = {
      text: "SELECT id FROM permissions WHERE shared_with_email = $1",
      values: [email],
    };

    const userAccountResult = await client.query(userAccountQuery);
    const userAccountId = userAccountResult.rows[0].id;

    const permissionResult = await client.query(permissionsQuery);
    const permissionIds = permissionResult.rows.map(row => row.id);

    const expensesQuery = {
      text: "SELECT * FROM expenses WHERE account_id = $1 OR account_id = $2",
      values: [userAccountId, permissionIds],
    };

    const expenseResult = await client.query(expensesQuery);

    const obj = {};

    expenseResult.rows.forEach(expense => {
      const accountId = expense.account_id;

      if (!obj[accountId]) obj[accountId] = [];

      obj[accountId].push(expense);
    });

    res.json({ success: true, expenses: expenseResult });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getExpenses };
