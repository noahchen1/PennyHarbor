const { client } = require("../db");

const getRequests = async (req, res) => {
  const { email } = req.params;

  try {
    const query = {
      text: "SELECT * FROM permissions WHERE shared_with_email = $1",
      values: [email],
    };

    const result = await client.query(query);

    res.json({ success: true, expenses: result.rows });
  } catch (error) {
    console.error("Error retrieving requests:", error);
    res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

module.exports = { getRequests };
