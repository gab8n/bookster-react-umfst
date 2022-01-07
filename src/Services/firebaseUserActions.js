import firebase from 'utils/firebaseConfig';

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();
export const addComment = (comment, bookId, userId, displayName, photoURL) => {
  const commentObj = {
    comment,
    userId,
    createdAt: new Date(),
    displayName,
    photoURL,
  };
  database
    .collection('books')
    .doc(bookId)
    .update({ comments: firebase.firestore.FieldValue.arrayUnion(commentObj) });
};
export const deleteComment = (commentObj, bookId) => {
  database
    .collection('books')
    .doc(bookId)
    .update({
      comments: firebase.firestore.FieldValue.arrayRemove(commentObj),
    });
};
export const getComments = (bookId, setData) => {
  database
    .collection('books')
    .doc(bookId)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setData(data.comments);
      }
    });
};
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
export const getUserBoorrowBookData = (userId, setUserBorrowBookData) => {
  database
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      setUserBorrowBookData((prevState) => {
        return {
          ...prevState,
          phone: doc.data().phone,
          firstName: doc.data().givenName,
          lastName: doc.data().familyName,
        };
      });
    });
};

export const createBorrowRequest = (
  bookId,
  userId,
  userInfo,
  handleError,
  handleSuccess
) => {
  database
    .collection('books')
    .doc(bookId)
    .get()
    .then((doc) => {
      if (doc.data().available === true) {
        database
          .collection('orders')
          .doc()
          .set({
            bookCover: doc.data().thumbnail,
            bookId: bookId,
            userId: userId,
            status: 'pending',
            date: new Date(),
            ...userInfo,
          })
          .then(() => {
            database
              .collection('books')
              .doc(bookId)
              .update({ available: false });
            handleSuccess('Your request has been sent');
          });
      } else {
        handleError('Book is not aviable');
      }
    });
};

export const getUserOrders = (userId, setUserBorrowedBooks) => {
  database
    .collection('orders')
    .where('userId', '==', userId)
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setUserBorrowedBooks(data);
    });
};
