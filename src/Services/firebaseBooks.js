import firebase from 'utils/firebaseConfig';

export const database = firebase.firestore();

export const addBookToCollection = (bookData, handleSuccess, handleError) => {
  database
    .collection('books')
    .doc()
    .set({
      ...bookData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      handleError(error.message);
    });
};
