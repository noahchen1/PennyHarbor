require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");
const firebase = require("firebase-admin");
const serviceAccount = require("./penny-harbor-user-credentials-firebase-adminsdk-x3gsj-1b788ad71c.json");

const { connectDB } = require("./db");
const { addExpense } = require("./routes/addExpense");
const { getExpenses } = require("./routes/getExpenses");
const { addCategory } = require("./routes/addCategory");
const { getCategories } = require("./routes/getCategories");
const { register } = require("./routes/register");
const { signin } = require("./routes/signin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(cors(allowedOrigins));

app.post("/add", addExpense);
app.get("/expenses/:username", getExpenses);
app.post("/category", addCategory);
app.get("/category/:username", getCategories);
app.post("/register", register);
app.post("/signin", signin);

const startServer = async () => {
  // await connectDB();

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });

  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Server starting interupted", error);
    throw error;
  }
};

startServer();
