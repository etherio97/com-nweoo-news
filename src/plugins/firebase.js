import { firebaseConfig } from "../config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";
import Vue from "vue";

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
  firebase.performance();
}

Vue.prototype.$auth = firebase.auth;

export default firebase;
