import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAx0EGv6nRby0ToBYbo8_O7JXBRX7gFm00",
  authDomain: "reactnativefirebase-abb8d.firebaseapp.com",
  databaseURL: "https://reactnativefirebase-abb8d.firebaseio.com",
  projectId: "reactnativefirebase-abb8d",
  storageBucket: "reactnativefirebase-abb8d.appspot.com",
  messagingSenderId: "787634329660",
  appId: "1:787634329660:web:6bc7b4beb3a35ecc730b39"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


firebase.firestore();

export default firebase;