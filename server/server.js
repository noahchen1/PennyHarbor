require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { connectDB } = require("./db");
const { addExpense } = require("./routes/addExpense");
const { getExpenses } = require("./routes/getExpenses");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/add", addExpense);
app.get("/expenses/:username", getExpenses);

const startServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Server starting interupted", error);
    throw error;
  }
};

startServer();
