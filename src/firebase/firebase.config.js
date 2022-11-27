// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId

//   apiKey: "AIzaSyAXnrSG-zas574ffHPXP8xLf0pHYgKXDKY",
//   authDomain: "music-spot-51606.firebaseapp.com",
//   projectId: "music-spot-51606",
//   storageBucket: "music-spot-51606.appspot.com",
//   messagingSenderId: "487200714797",
//   appId: "1:487200714797:web:47894e7939ab03e4fa08a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;