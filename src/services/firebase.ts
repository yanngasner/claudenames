import firebase from 'firebase';
import {firebaseConfig} from "../../claudeNames-privateConfigs/firebaseConfig";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();