require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");

const { connectDB } = require("./db");
const { connectAuthdb } = require("./authdb");
const { addExpense } = require("./routes/addExpense");
const { getExpenses } = require("./routes/getExpenses");
const { addCategory } = require("./routes/addCategory");
const { getCategories } = require("./routes/getCategories");
const { addAccount } = require("./routes/addAccount");
const { getAccounts } = require("./routes/getAccounts");

const { sendRequest } = require("./routes/sendRequest");
const { getRequests } = require("./routes/getRequests");
const { approveRequest } = require("./routes/approveRequest");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(cors(allowedOrigins));

app.post("/add", addExpense);
app.get("/expenses/:email", getExpenses);
app.post("/category", addCategory);
app.get("/category/:email", getCategories);
app.get("/account", getAccounts);
app.post("/account", addAccount);
app.post("/request", sendRequest);
app.get("/request/:email", getRequests);
app.post("/request/approve", approveRequest);

const startServer = async () => {
  await connectDB();
  await connectAuthdb();

  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Server starting interupted", error);
    throw error;
  }
};

startServer();
