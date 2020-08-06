import Firebase from 'firebase';

const firebaseConfig= { 
    apiKey:'AIzaSyC_wOBYpL6ezayY08FFA7vs5seyTPNtCC8',
    databaseURL:'https://textyou-7a1ba.firebaseio.com/',
    projectId:'textyou-7a1ba',
    appId:'1:391093870982:android:512d7d5aac158700378c07',
};


//const firebase = Firebase.initializeApp(firebaseConfig);
//export default firebase;

//export default !Firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

//export default firebase.initializeApp(firebaseConfig);

Firebase.initializeApp(firebaseConfig);
