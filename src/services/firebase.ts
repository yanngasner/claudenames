import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA9W-fpaIG2439CkpZusuAQ0hqaOaQaJE0",
    authDomain: "confinauds.firebaseapp.com",
    databaseURL: "https://confinauds.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();