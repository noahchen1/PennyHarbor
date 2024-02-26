const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDB = async () => {
  try {
    await client.connect();

    console.log("Connected to PostgreSQL!");
    return client;
  } catch (error) {
    console.log("Connection error", error);
    throw error;
  }
};

module.exports = { connectDB, client };
