import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCECnq8NdeNQQVnv3YlZcylJ4xhz0Iidgw",
    authDomain: "crud-react-2794c.firebaseapp.com",
    projectId: "crud-react-2794c",
    storageBucket: "crud-react-2794c.appspot.com",
    messagingSenderId: "941810510613",
    appId: "1:941810510613:web:37f8fcce907f1f721fd71c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}