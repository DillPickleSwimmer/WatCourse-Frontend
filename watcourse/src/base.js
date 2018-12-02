/* https://medium.com/quick-code/adding-authentication-to-react-redux-firebase-app-f0efcb1c519a */

import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDN8VU94Zbdym2es6TEgpx5OhVUcX_Q9D8",
    authDomain: "watcourse-a9f81.firebaseapp.com",
    databaseURL: "https://watcourse-a9f81.firebaseio.com",
    projectId: "watcourse-a9f81",
    storageBucket: "watcourse-a9f81.appspot.com",
    messagingSenderId: "266292077586"
};

firebase.initializeApp(config);

export const authRef = firebase.auth();
//export const provider = new firebase.auth.GoogleAuthProvider();

//export default fb;