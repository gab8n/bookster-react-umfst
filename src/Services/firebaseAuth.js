import firebase from 'utils/firebaseConfig';
import axios from 'axios';

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();

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
          firebase
            .storage()
            .ref('users/defaultProfilePicture/userAvatar.svg')
            .getDownloadURL()
            .then((imgUrl) => {
              const userData = {
                uid: currentUser.user.uid,
                email: currentUser.user.email,
                displayName: username,
                photoURL: imgUrl,
              };
              setNewUserData(currentUser.user, userData);
              handleSuccess(userData);
            });
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
      biography: '',
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
      .onSnapshot((doc) => {
        if (doc.exists) {
          handleSuccess(doc.data());
        } else {
          handleError('User does not exist');
        }
      });
    // .get()
    // .then((doc) => {
    //   if (doc.exists) {
    //     handleSuccess(doc.data());
    //   } else {
    //     handleError('No user found!');
    //   }
    // })
    // .catch((error) => {
    //   handleError(error);
    // });
  }
};

export const changeProfilePicture = (file, handleSuccess, handleError) => {
  const user = auth.currentUser;

  storage
    .ref('users/' + user.uid + '/profile.jpg')
    .put(file)
    .then(() => {
      firebase
        .storage()
        .ref('users/' + user.uid + '/profile.jpg')
        .getDownloadURL()
        .then((imgUrl) => {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update({ photoURL: imgUrl })
            .then(() => {
              user
                .updateProfile({ photoURL: imgUrl })
                .then(() => {
                  // handleSuccess();
                })
                .catch(() => {
                  // handleError('Error updating profile picture');
                });
            });

          // handleSuccess();
        })
        .catch((error) => {
          console.log(error);
          // handleError(error.message);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateUserData = (userData) => {
  const user = auth.currentUser;
  database
    .collection('users')
    .doc(user.uid)
    .update({
      ...userData,
    })
    .then(() => {
      console.log('success');
      user
        .updateProfile({ displayName: userData.displayName })
        .then(() => {
          // handleSuccess();
        })
        .catch(() => {
          // handleError('Error updating profile picture');
        });
    })
    .catch((error) => {
      console.log(error);
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

//#########################-  developing purpose -#############################

export const populateDbWithUsers = () => {
  axios.get(`https://randomuser.me/api/`).then((res) => {
    const user = res.data.results[0];

    auth
      .createUserWithEmailAndPassword(user.email, user.login.password)
      .then((currentUser) => {
        currentUser.user
          .updateProfile({
            displayName: user.login.username,
          })
          .then(() => {
            const userData = {
              uid: currentUser.user.uid,
              email: currentUser.user.email,
              displayName: user.login.username,
              photoURL: user.picture.thumbnail,
              familyName: user.name.last,
              givenName: user.name.first,
              phone: user.phone,
              address: user.location.street,
              city: user.location.city,
              state: user.location.state,
              wishlist: [],
              borrowedBooks: [],
              bookHistory: [],
            };
            setNewUserData(currentUser.user, userData);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
