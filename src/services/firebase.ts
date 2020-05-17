import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCJGzHP89TnWASh94HjPzDK46corClVULk",
    authDomain: "claude-name.firebaseapp.com",
    databaseURL: "https://claude-name.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();