
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyC2lJL4ixVJZ5W0o40VrbkqkdUcqGJ1ZKg",
    authDomain: "tchat-esd.firebaseapp.com",
    databaseURL: "https://tchat-esd.firebaseio.com",
    projectId: "tchat-esd",
    storageBucket: "tchat-esd.appspot.com",
    messagingSenderId: "480169967880",
    appId: "1:480169967880:web:23b546f97de24a1caa6cbd"
};

firebase.initializeApp(config)
firebase.analytics();

export default firebase;