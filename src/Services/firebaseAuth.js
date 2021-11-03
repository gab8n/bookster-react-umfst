import firebase from 'utils/firebaseConfig';

export const auth = firebase.auth();

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
