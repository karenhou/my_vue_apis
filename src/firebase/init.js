import firebase from 'firebase'
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzC09tvwNF3QdfOCeXkUPL9wLi-qrs1J0",
    authDomain: "vue-authentication-73b90.firebaseapp.com",
    databaseURL: "https://vue-authentication-73b90.firebaseio.com",
    projectId: "vue-authentication-73b90",
    storageBucket: "vue-authentication-73b90.appspot.com",
    messagingSenderId: "919086678781"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firestore database
export default firebaseApp.firestore()
