const firebase = require("firebase-admin");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(401).json({ error: "Failed to sign in user" });
  }
};

module.exports = { signin };
