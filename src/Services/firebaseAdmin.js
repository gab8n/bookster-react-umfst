import firebase from 'utils/firebaseConfig';
import { getNextWeek, getDifferenceBetweenDates } from 'utils/dateFunctions';
export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();

export const getAllOrders = (setData) => {
  database
    .collection('orders')
    .orderBy('date', 'desc')
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        if (doc.data().timeout) {
          console.log(
            getDifferenceBetweenDates(
              getNextWeek(getNextWeek(getNextWeek(doc.data().timeout.toDate())))
            )
          );
        }
        return { ...doc.data(), id: doc.id };
      });
      if (data) {
        setData(data);
      }
    });
};

export const setOrderStatus = (id, status, bookId) => {
  if (status === 'delivered') {
    database
      .collection('orders')
      .doc(id)
      .update({ timeout: new Date(), status });
  } else if (status === 'returned') {
    database
      .collection('orders')
      .doc(id)
      .update({ status })
      .then(() => {
        database.collection('books').doc(bookId).update({ available: true });
      });
  } else {
    database.collection('orders').doc(id).update({ status });
  }
};
export const getBooks = (
  setData,
  lastVisibleDocument,
  title,
  authors,
  isbn,
  genres,
  publisher
) => {
  console.log('getBooks');
  let bookCollection = database.collection('books');

  bookCollection = title
    ? bookCollection
        .where('title', '>=', title)
        .where('title', '<=', title + '\uf8ff')
    : bookCollection;
  bookCollection = isbn
    ? bookCollection
        .where('isbn', '>=', isbn)
        .where('isbn', '<=', isbn + '\uf8ff')
    : bookCollection;
  bookCollection = authors
    ? bookCollection.where('authors', 'array-contains', authors)
    : bookCollection;
  bookCollection = genres
    ? bookCollection.where('genres', 'array-contains', genres)
    : bookCollection;
  bookCollection = publisher
    ? bookCollection
        .where('publisher', '>=', publisher)
        .where('publisher', '<=', publisher + '\uf8ff')
    : bookCollection;

  bookCollection = lastVisibleDocument
    ? bookCollection.startAfter(lastVisibleDocument).limit(20)
    : bookCollection.limit(20);

  bookCollection.onSnapshot((querySnapshot) => {
    let booksArray = [];
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'modified') {
        setData((prevBooks) =>
          prevBooks.map((book) =>
            book.id === change.doc.id ? change.doc : book
          )
        );
      } else if (change.type === 'added') {
        booksArray.push(change.doc);
      } else if (change.type === 'removed') {
        setData((prevBooks) =>
          prevBooks.filter((book) => book.id !== change.doc.id)
        );
      }
    });

    setData((prevBooksArray) => {
      return [...prevBooksArray, ...booksArray];
    });
  });
};

export const setBookAviability = (id, aviability) => {
  database.collection('books').doc(id).update({ aviable: aviability });
};

export const deleteBook = (id) => {
  database
    .collection('books')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
export const addBook = (data) => {
  database.collection('books').doc().set(data);
};
