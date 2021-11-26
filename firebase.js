import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlFiWnlKtm_UcyOX45Vge41Q89JloKTuw",
  authDomain: "village-9b31a.firebaseapp.com",
  projectId: "village-9b31a",
  storageBucket: "village-9b31a.appspot.com",
  messagingSenderId: "1073197668608",
  appId: "1:1073197668608:web:2d87fda9215ae18df93be5",
  measurementId: "G-J7L6GB8J8Z"
};
  if(firebase.apps.length === 0)
  {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
