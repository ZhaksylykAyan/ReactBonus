import firebase from 'firebase/app'
import "firebase/auth";

export const auth = firebase.initializeApp(
    {
        apiKey: "AIzaSyDHeRh5-nkfEjqUTn40zQ-eqa8G8dD5Ea8",
        authDomain: "mychat-9abc0.firebaseapp.com",
        projectId: "mychat-9abc0",
        storageBucket: "mychat-9abc0.appspot.com",
        messagingSenderId: "862191718222",
        appId: "1:862191718222:web:f95d984555958689b1581f"
    }
).auth();