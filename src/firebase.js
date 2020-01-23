import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAVnUbx0LDtuXW6hx51znkFVUnO-E5hktc",
    authDomain: "exam-66cdb.firebaseapp.com",
    databaseURL: "https://exam-66cdb.firebaseio.com",
    projectId: "exam-66cdb",
    storageBucket: "exam-66cdb.appspot.com",
    messagingSenderId: "979220998012",
    appId: "1:979220998012:web:615c6fb5ec4199a6b0e6f9",
    measurementId: "G-W0LWKM3LYP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;