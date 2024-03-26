const { client } = require("../db");

const getAccounts = async (req, res) => {
  const { email } = req.params;

  try {
    const query = {
      text: "SELECT * FROM useraccount WHERE email = $1",
      values: [email],
    };

    // const query = {
    //   text: `
    //     SELECT user_account_id
    //     FROM useraccount
    //     WHERE email = $1
    //     UNION
    //     SELECT user_account_id
    //     FROM permissions
    //     WHERE shared_with_user_email = $1
    //   `,
    //   values: [email],
    // };

    const result = await client.query(query);

    res.json({ success: true, accounts: result.rows });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAccounts };
