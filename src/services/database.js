import store from '@/store';
import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAvrQMOpCipQMjphKHEPPbFXlnQmgc8_mc",
    authDomain: "modern-jukebox-vue.firebaseapp.com",
    databaseURL: "https://modern-jukebox-vue.firebaseio.com",
    projectId: "modern-jukebox-vue",
    storageBucket: "modern-jukebox-vue.appspot.com",
    messagingSenderId: "387871484251",
    appId: "1:387871484251:web:3e6d987ad9102a30"
  };

firebase.initializeApp( config );

export const auth = firebase.auth();
export const db = firebase.firestore();


const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if( ! ios) {
    firebase.messaging().usePublicVapidKey('BCMIRZtK1hVUv9KQ_WRRc3GfiE4o2crWAjyGJsGmviDZBBNtp5omkRxa45N2GsGnN6ZfoF5u3kTliLvp7danh2I');
}



auth.signUp = async( email, password, password2 ) => {

    if(password !== password2) {
        return '!match';
    } else {
        try {
            await auth.createUserWithEmailAndPassword( email, password );
            store.commit( 'SET_CURRENT_USER', auth.currentUser );
            return true;
        } catch( err ) {
            return err;
        }
    }
}

auth.signIn = async( email, password ) => {
    
    try {
        await auth.signInWithEmailAndPassword( email, password );

        store.commit( 'SET_CURRENT_USER', auth.currentUser );

        return true;
    } catch( err ) {
        return err;
    }
}

auth.loginWithFacebook = async() => {
    try {
        let provider = new firebase.auth.FacebookAuthProvider();

        await auth.signInWithPopup(provider);

        store.commit( 'SET_CURRENT_USER', auth.currentUser );

        return true;

    } catch ( err ) {
        return err;
    }
}

auth.loginWithGoogle = async() => {
    try {

        let provider = new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            'display': 'popup'
        });
        
        await auth.signInWithPopup(provider);

        store.commit( 'SET_CURRENT_USER', auth.currentUser );

        return true;

    } catch ( err ) {
        return err;
    }
}
