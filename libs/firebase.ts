// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMjDlSiVCNWk8ZvOYurlc6Qyx4mFo1KMQ",
  authDomain: "e-shop-405807.firebaseapp.com",
  projectId: "e-shop-405807",
  storageBucket: "e-shop-405807.appspot.com",
  messagingSenderId: "57447975540",
  appId: "1:57447975540:web:12366c7d0224def2219f21"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp