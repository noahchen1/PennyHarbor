import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMtAgtaUAUs9DamaG0pAhAE7S2lL7hFe4",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://penny-harbor-user-credentials.firebaseio.com",
  projectId: "penny-harbor-user-credentials",
  storageBucket: "penny-harbor-user-credentials.appspot.com",
  messagingSenderId: "887438819979",
  appId: "1:887438819979:android:fe7c298b00ba3c10578a8e",
  //   measurementId: 'G-measurement-id',
};

export default firebaseConfig;

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
