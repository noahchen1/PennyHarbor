const { client } = require("../db");

const approveRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const query = {
      text: "UPDATE permissions SET permission = true WHERE id = $1",
      values: [requestId],
    };

    const result = await client.query(query);

    res.json({ success: true, request: result.rows });
  } catch (error) {
    console.error("Error retrieving requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { approveRequest };
