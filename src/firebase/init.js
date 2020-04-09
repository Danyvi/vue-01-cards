// import firebase from 'firebase'
import * as firebase from 'firebase/app';
// import firestore from 'firebase/firestore'
import 'firebase/firestore'
  
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB1ECtUa3_Mh5G7U6-9H4RKsAg---ZixtU",
  authDomain: "udemy-ninja-smoothies-41c82.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-41c82.firebaseio.com",
  projectId: "udemy-ninja-smoothies-41c82",
  storageBucket: "udemy-ninja-smoothies-41c82.appspot.com",
  messagingSenderId: "772206336236",
  appId: "1:772206336236:web:2d6b3938b37962057c6dc9",
  measurementId: "G-HTVY2DMPM3"
};

// firebase.analytics();


// Initialize Firebase
const fireBaseApp = firebase.initializeApp(firebaseConfig);
// export firestore database
export default fireBaseApp.firestore();



// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }