import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCs67LOvjCF15UuF09hTPbMUPv__CIEUsE",
  authDomain: "segware-challenge.firebaseapp.com",
  databaseURL: "https://segware-challenge.firebaseio.com",
  projectId: "segware-challenge",
  storageBucket: "segware-challenge.appspot.com",
  messagingSenderId: "720671233866",
};
firebase.initializeApp(config);
    
firebase.firestore().settings(settings);

export default firebase;