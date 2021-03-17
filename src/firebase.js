import firebase from "firebase"

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5Y0J8izn6czLUUOX6VJ-XwUJ5Ei6qu8Q",
    authDomain: "bt3103-week-6-85be7.firebaseapp.com",
    projectId: "bt3103-week-6-85be7",
    storageBucket: "bt3103-week-6-85be7.appspot.com",
    messagingSenderId: "5877682166",
    appId: "1:5877682166:web:90f9da4c022406414f41d7",
    measurementId: "G-07LHN6L3WS"
};
  
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;