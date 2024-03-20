const { client } = require("../db");

const addAccount = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const insertQuery = {
      text: "INSERT INTO useraccount (email) VALUES ($1) RETURNING *",
      values: [email],
    };

    const selectQuery = {
      text: "SELECT * FROM useraccount",
    };

    const result = await client.query(insertQuery);

    const content = await client.query(selectQuery);

    res.json({ success: true, expense: content.rows });
  } catch (error) {
    console.error("Error adding account", error);
    res
      .status(500)
      .json({ success: false, error: `failed to add catagory: ${error}` });
  }
};

module.exports = { addAccount };
