import firebase from 'utils/firebaseConfig';

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();

export const addBookToWishlist = (bookId, userId) => {
  console.log('addBookToWishlist');
  database
    .collection('users')
    .doc(userId)
    .update({ wishlist: firebase.firestore.FieldValue.arrayUnion(bookId) });
};
export const removeBookFromWishlist = (bookId, userId) => {
  console.log('removeBookFromWishlist');
  database
    .collection('users')
    .doc(userId)
    .update({ wishlist: firebase.firestore.FieldValue.arrayRemove(bookId) });
};
export const checkIfBookIsInWishlist = (
  bookId,
  userId,
  setBookWishlistStatus
) => {
  database
    .collection('users')
    .doc(userId)
    .onSnapshot((doc) => {
      setBookWishlistStatus(
        doc.data().wishlist.includes(bookId) ? true : false
      );
    });
};
export const updateStatusOfBook = (bookId, status) => {
  database.collection('books').doc(bookId).update({ status: status });
};
export const borrowBook = (bookId, userId) => {
  database
    .collection('books')
    .doc(bookId)
    .get()
    .then((doc) => {
      if (doc.data().status === 'available') {
        database
          .collection('users')
          .doc(userId)
          .get()
          .then((userDoc) => {
            if (userDoc.data().borrowedBooks.length < 3) {
              database
                .collection('users')
                .doc(userId)
                .update({
                  borrowed: firebase.firestore.FieldValue.arrayUnion(bookId),
                })
                .then(() => {
                  updateStatusOfBook(bookId, 'borrowed');
                });
            }
          });
      }
    });
};
