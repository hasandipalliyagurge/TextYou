import Firebase from 'firebase';

const firebaseConfig= { 
    apiKey:'',
    databseURL:'',
    projectId:'',
    appId:'',
};

export default Firebase.initializeApp(firebaseConfig);