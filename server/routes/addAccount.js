const { client } = require("../db");

const addAccount = async (req, res) => {
  const { email, name } = req.body;
  
  try {
    const insertQuery = {
      text: "INSERT INTO useraccount (email, name) VALUES ($1, $2) RETURNING *",
      values: [email, name],
    };

    const selectQuery = {
      text: "SELECT * FROM useraccount WHERE email = $1",
      values: [email],
    };
    
    const result = await client.query(insertQuery);

    const content = await client.query(selectQuery);

    res.json({ success: true, accounts: content.rows });
  } catch (error) {
    console.error("Error adding account", error);
    res
      .status(500)
      .json({ success: false, error: `failed to add account: ${error}` });
  }
};

module.exports = { addAccount };
