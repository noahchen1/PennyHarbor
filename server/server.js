require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");

const { connectDB } = require("./db");
const { addExpense } = require("./routes/addExpense");
const { getExpenses } = require("./routes/getExpenses");
const { addCatagory } = require("./routes/addCatagory");
const { getCategories } = require("./routes/getCategories");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(cors(allowedOrigins));

app.post("/add", addExpense);
app.get("/expenses/:username", getExpenses);
app.post("/catagory", addCatagory);
app.get("/catagory/:username", getCategories);

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
