import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/analytics";

const recaptchaClientKey = "6Lcet-EcAAAAAIkhtuTpJGmAVZ5m0dhnS4G0FU4_";

const firebaseConfig = {
  apiKey: "AIzaSyBJfrR7N4V6JfzWBHCcK94QB5KwjNuim5Q",
  appId: "1:685553468611:web:5364a0efc42fef12b04e76",
  authDomain: "nwe-oo.firebaseapp.com",
  databaseURL: "https://nwe-oo-default-rtdb.firebaseio.com",
  measurementId: "G-3F1JBYP13M",
  messagingSenderId: "685553468611",
  projectId: "nwe-oo",
  storageBucket: "nwe-oo.appspot.com",
};

const app = firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  firebase.appCheck().activate(recaptchaClientKey);
  firebase.analytics();
} else {
  // console.log("Automatically connecting Firebase SDKs to running emulators:");
  // firebase.database().useEmulator("localhost", "3300");
  // firebase.auth().useEmulator("http://localhost:9009");
}

export default app;
