const firebase = require("firebase-admin");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await firebase.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

module.exports = { register };
