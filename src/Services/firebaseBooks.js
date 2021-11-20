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
export const getBooks = (itemsPerPage, lastVisibleDocument, setBooksList) => {
  const bookCollection = lastVisibleDocument
    ? database
        .collection('books')
        .orderBy('title')
        .startAt(lastVisibleDocument)
        .limit(itemsPerPage)
    : database.collection('books').orderBy('title').limit(itemsPerPage);

  // .where('publicationYear', '==', '2002')
  bookCollection
    .get()
    .then((querySnapshot) => {
      let booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push(doc);
      });
      setBooksList((prevBooksArray) => {
        console.log(prevBooksArray);
        return [...prevBooksArray, ...booksArray];
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
