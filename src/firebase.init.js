// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2IERp54W0F2ha4KzmjmNqOGtCEVF1a4g",
    authDomain: "agro-trace-demo.firebaseapp.com",
    projectId: "agro-trace-demo",
    storageBucket: "agro-trace-demo.appspot.com",
    messagingSenderId: "819612693629",
    appId: "1:819612693629:web:1862f08ef1b21ea2d56d14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;