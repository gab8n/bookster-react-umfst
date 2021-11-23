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
export const getBooks = (
  itemsPerPage,
  lastVisibleDocument,
  setBooksList,
  filters
) => {
  const { genresFilter, authorsFilter, publishersFilter } = filters;

  let bookCollection = database.collection('books');
  bookCollection =
    genresFilter.length !== 0
      ? bookCollection.where('genres', 'array-contains-any', genresFilter)
      : bookCollection;
  bookCollection =
    authorsFilter.length !== 0
      ? bookCollection.where('authors', 'array-contains-any', authorsFilter)
      : bookCollection;
  bookCollection = publishersFilter.length
    ? bookCollection.where('publisher', 'in', publishersFilter)
    : bookCollection;
  bookCollection = lastVisibleDocument
    ? bookCollection
        .orderBy('timestamp')
        .startAt(lastVisibleDocument)
        .limit(itemsPerPage)
    : bookCollection.orderBy('timestamp').limit(itemsPerPage);

  bookCollection
    .get()
    .then((querySnapshot) => {
      let booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push(doc);
      });
      setBooksList((prevBooksArray) => {
        return [...prevBooksArray, ...booksArray];
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

export const addBookFilter = (filter, type, handleSuccess, handleError) => {
  console.log(type, filter);
  const document = database.collection('bookFilters').doc(type);

  document.get().then((querySnapshot) => {
    if (querySnapshot.data()[type].includes(filter)) {
      console.log('already exists');
    } else {
      document
        .update({
          [type]: firebase.firestore.FieldValue.arrayUnion(filter),
        })
        .then(() => {
          // handleSuccess();
          console.log('adaugat teoretic');
        })
        .catch((error) => {
          // handleError(error.message);
          console.log(error.message);
        });
    }
  });
};

export const getFilters = (type, setData) => {
  database
    .collection('bookFilters')
    .doc(type)
    .get()
    .then((querySnapshot) => {
      // console.log(querySnapshot.data().genres);
      setData(querySnapshot.data()[type]);
      // return querySnapshot.data().genres;
      // handleSuccess();
    })
    .catch((error) => {
      // handleError(error.message);
    });
};

//Dev Purpose -###################################

// export const getBooksAll = () => {
//   const bookCollection = database.collection('books');

//   bookCollection
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.data().publisher);
//         addBookFilter(doc.data().publisher, 'publisher');
//       });
//     })
//     .catch((error) => {
//       console.log('Error getting documents: ', error);
//     });
// };
