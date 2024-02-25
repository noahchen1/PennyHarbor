require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();

app.use(bodyParser.json());

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

app.post("/add", async (req, res) => {
  try {

    const { username, text, value, color, date } = req.body;

    const result = await client.query(
      "INSERT INTO expenses (username, text, value, color, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, text, value, color, date]
    );

    res.json({ success: true, expense: result.rows[0] });


  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ success: false, error: "Failed to add expense" });
  }
});

app.get("/expenses/:username", async (req, res) => {
  const { username } = req.params;

  try {

    const query = {
      text: "SELECT * FROM expenses WHERE username = $1",
      values: [username],
    };

    const result = await client.query(query);

    res.json(result.rows);


  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
