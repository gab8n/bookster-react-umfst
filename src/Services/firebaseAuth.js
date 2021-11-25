import firebase from 'utils/firebaseConfig';

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
export const signInWithGoogle = (handleSuccess, handleError, setData) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleProvider)
    .then((currentUser) => {
      handleSuccess();
      const userData = {
        uid: currentUser.user.uid,
        email: currentUser.user.email,
        displayName: currentUser.user.displayName,
        photoURL: currentUser.user.photoURL,
      };
      setData(userData);
      console.log(currentUser);

      if (currentUser.additionalUserInfo.isNewUser) {
        setNewUserData(currentUser.user, {
          ...userData,
          creationDate: currentUser.user.multiFactor.user.metadata.creationTime,
          familyName: currentUser.additionalUserInfo.profile.family_name,
          givenName: currentUser.additionalUserInfo.profile.given_name,
          verified: currentUser.user.emailVerified,
          phone: currentUser.user.multiFactor.user.phoneNumber,
        });
      }
    })
    .catch((error) => {
      handleError(error.message);
      console.log(error);
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
      currentUser.user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          const userData = {
            uid: currentUser.user.uid,
            email: currentUser.user.email,
            displayName: username,
            photoURL: currentUser.user.photoURL,
          };
          setNewUserData(currentUser.user, userData);
          handleSuccess(userData);
        });
    })
    .catch((error) => {
      handleError(error.message);
      console.log(error);
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

const setNewUserData = (user, userData) => {
  database
    .collection('users')
    .doc(user.uid)
    .set({
      familyName: '',
      givenName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      wishlist: [],
      borrowedBooks: [],
      bookHistory: [],
      creationDate: firebase.firestore.FieldValue.serverTimestamp(),
      ...userData,
    })
    .then()
    .catch((error) => {
      console.log(error);
    });
};

export const getUserData = (handleSuccess, handleError) => {
  const user = auth.currentUser;
  if (user) {
    database
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          handleSuccess(doc.data());
        } else {
          handleError('No user found!');
        }
      })
      .catch((error) => {
        handleError(error);
      });
  }
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
