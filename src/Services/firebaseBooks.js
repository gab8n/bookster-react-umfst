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
  const { genres, authors, publisher } = filters;

  let bookCollection = database
    .collection('books')
    .where('status', '==', 'aviable');
  bookCollection =
    genres.length !== 0
      ? bookCollection.where('genres', 'array-contains-any', genres)
      : bookCollection;
  bookCollection =
    authors.length !== 0
      ? bookCollection.where('authors', 'array-contains-any', authors)
      : bookCollection;
  bookCollection = publisher.length
    ? bookCollection.where('publisher', 'in', publisher)
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
export const getBooksForSlider = (setBooksList) => {
  let bookCollection = database
    .collection('books')
    .orderBy('timestamp')
    .limit(20);

  bookCollection
    .get()
    .then((querySnapshot) => {
      let booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push(doc);
      });
      setBooksList(booksArray);
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
export const getBook = (id, setBook) => {
  database
    .collection('books')
    .doc(id)
    .onSnapshot((doc) => {
      if (doc.exists) {
        // handleSuccess(doc.data());
        setBook(doc.data());
      } else {
        // handleError('User does not exist');
      }
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

export const setAllBooksStatusToAviable = () => {
  database
    .collection('books')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          status: 'aviable',
        });
      });
    });
};
