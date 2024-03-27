const { client } = require("../db");
const getExpenses = require("./getExpenses");

const addExpense = async (req, res) => {
  try {
    const { username, text, value, color, date, comment, accountId } = req.body;

    const insertQuery = {
      text: "INSERT INTO expenses (username, text, value, color, date, comment, user_account_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values: [username, text, value, color, date, comment, accountId],
    };

    const userAccountQuery = {
      text: "SELECT id FROM useraccount WHERE email = $1",
      values: [username],
    };

    const permissionsQuery = {
      text: "SELECT expense_creator_account_id FROM permissions WHERE shared_with_email = $1 AND permission = true",
      values: [username],
    };

    const userAccountResult = await client.query(userAccountQuery);
    const userAccountId = userAccountResult.rows[0].id;

    const permissionResult = await client.query(permissionsQuery);
    const permissionIds = permissionResult.rows.map(
      (row) => row.expense_creator_account_id
    );

    let expensesQuery;
    if (permissionIds.length) {
      expensesQuery = {
        text: "SELECT * FROM expenses WHERE user_account_id = $1 OR user_account_id = $2",
        values: [userAccountId, ...permissionIds],
      };
    } else {
      expensesQuery = {
        text: "SELECT * FROM expenses WHERE user_account_id = $1",
        values: [userAccountId],
      };
    }

    const result = await client.query(insertQuery);
    const expenseResult = await client.query(expensesQuery);

    const data = {};

    expenseResult.rows.map((expense) => {
      const accountId = expense.user_account_id;

      if (!data[accountId]) data[accountId] = [];

      data[accountId].push(expense);
    });

    res.json({ success: true, expenses: data });
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ success: false, error: "Failed to add expense" });
  }
};

module.exports = { addExpense };
