import Firebase from 'firebase';

const firebaseConfig= { 
    apiKey:*****,
    databaseURL: *****,
    projectId:******,
    appId: ****** ,
};


//const firebase = Firebase.initializeApp(firebaseConfig);
//export default firebase;

//export default !Firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

//export default firebase.initializeApp(firebaseConfig);

Firebase.initializeApp(firebaseConfig);
