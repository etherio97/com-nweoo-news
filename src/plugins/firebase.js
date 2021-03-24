import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

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

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
}

export default firebase;
