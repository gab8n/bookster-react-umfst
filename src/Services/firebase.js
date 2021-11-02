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
  handleSuccess,
  handleError
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((currentUser) => {
      handleSuccess(currentUser);
    })
    .catch((error) => {
      handleError(error.message);
    });
};
export const signInWithGoogle = (handleSuccess, handleError) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleProvider)
    .then((currentUser) => {
      handleSuccess(currentUser);
    })
    .catch((error) => {
      handleError(error.message);
    });
};

export const createUserWithEmailAndPassword = (
  username,
  email,
  password,
  handleSuccess,
  handleError
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      console.log(currentUser);
      handleSuccess(currentUser);
      currentUser.user
        .updateProfile({
          displayName: username,
        })
        .then(() => {});
    })
    .catch((error) => {
      handleError(error.message);
    });
};

export const sendPasswordResetEmail = (email, handleSuccess, handleError) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      handleError(error.message);
    });
};

export const signOut = (handleSuccess, handleError) =>
  auth
    .signOut()
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      handleError(error.message);
    });
