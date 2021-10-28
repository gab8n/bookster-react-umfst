import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const database = firebase.firestore();

export const signInWithEmailAndPassword = (
  email,
  password,
  handleLoginSuccess,
  handleLoginError
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((currentUser) => {
      handleLoginSuccess(currentUser);
    })
    .catch((error) => {
      handleLoginError(error.message);
      console.log(error);
    });
};
export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleProvider)
    .then((currentUser) => {
      console.log(currentUser, 'logged with google');
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const createUserWithEmailAndPassword = (email, password, username) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      console.log(currentUser);
      currentUser.user
        .updateProfile({
          displayName: username,
        })
        .then(() => {});
    })
    .catch((error) => {
      console.log(error.message);
      console.log(error);
    });
};

export const signOut = () =>
  auth
    .signOut()
    .then(() => {
      console.log('logged out');
    })
    .catch((error) => {
      console.log(error);
    });
