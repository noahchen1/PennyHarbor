const { client } = require("../db");

const getExpenses = async (req, res) => {
  const { username } = req.params;

  try {
    const query = {
      text: "SELECT * FROM expenses WHERE username = $1",
      values: [username],
    };

    "SELECT id FROM useraccount WHERE email = $1"
    "SELECT id FROM permissions WHERE shared_with_email = $1"
    "SELECT * FROM expenses WHERE account_id = "

    const result = await client.query(query);

    res.json({ success: true, expenses: result.rows });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getExpenses };


// update ////

// const { client } = require("../db");

// const getExpensesByUserEmail = async (userEmail) => {
//   try {
//     // Retrieve user ID from useraccount table
//     const userQuery = {
//       text: "SELECT id FROM useraccount WHERE email = $1",
//       values: [userEmail],
//     };
//     const userResult = await client.query(userQuery);
//     const userId = userResult.rows[0].id;

//     // Retrieve permission IDs from permissions table
//     const permissionsQuery = {
//       text: "SELECT id FROM permissions WHERE shared_with_email = $1",
//       values: [userEmail],
//     };
//     const permissionsResult = await client.query(permissionsQuery);
//     const permissionIds = permissionsResult.rows.map(row => row.id);

//     // Query expenses based on user ID and permission IDs
//     const expensesQuery = {
//       text: "SELECT * FROM expenses WHERE account_id = $1 OR account_id = ANY($2)",
//       values: [userId, permissionIds],
//     };
//     const expensesResult = await client.query(expensesQuery);

//     // Organize expenses by account ID
//     const expensesByAccountId = {};
//     expensesResult.rows.forEach(expense => {
//       const accountId = expense.account_id;
//       if (!expensesByAccountId[accountId]) {
//         expensesByAccountId[accountId] = [];
//       }
//       expensesByAccountId[accountId].push(expense);
//     });

//     return expensesByAccountId;
//   } catch (error) {
//     console.error("Error retrieving expenses:", error);
//     throw error;
//   }
// };

// module.exports = { getExpensesByUserEmail };
