const firebase = require("firebase-admin");
const serviceAccount = require("./penny-harbor-user-credentials-firebase-adminsdk-x3gsj-12f672c32c.json");

const connectAuthdb = async () => {
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });

    console.log("Connected to Firebase!");
  } catch (error) {
    console.log("Connection error", error);
    throw error;
  }
};

module.exports = { connectAuthdb };

