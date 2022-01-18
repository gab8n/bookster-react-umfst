import firebase from 'utils/firebaseConfig';
import axios from 'axios';

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
export const getWishlistBooks = (booksArray, setWishilst) => {
  setWishilst([]);
  booksArray.forEach((book) => {
    database
      .collection('books')
      .doc(book)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setWishilst((prevState) => [
          ...prevState,
          { ...doc.data(), id: doc.id },
        ]);
      });
  });
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
      if (doc.data().aviable === true) {
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
            database.collection('books').doc(bookId).update({ aviable: false });
            handleSuccess('Your request has been sent');
            //aici ar trebui sa trimita un email cu detaliile
            axios
              .get(
                `http://127.0.0.1:5000/api/bookRecomandation/?book_id=${bookId}&user_id=${userId}`
              )
              .then((res) => {
                console.log(res.data);
              });
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

export const addRatingToBook = (
  bookId,
  userId,
  bookRating,
  isFirstRating,
  overallRating,
  ratingCount,
  oldRating
) => {
  const newRating = (
    (overallRating * ratingCount + bookRating) /
    (ratingCount + 1)
  ).toFixed(2);
  if (isFirstRating) {
    database
      .collection('books')
      .doc(bookId)
      .update({
        rating: newRating,
        ratingCount: ratingCount + 1,
        ratingList: firebase.firestore.FieldValue.arrayUnion({
          id: userId,
          rating: bookRating,
        }),
      });
  } else {
    database
      .collection('books')
      .doc(bookId)
      .update({
        rating: newRating,
        ratingList: firebase.firestore.FieldValue.arrayRemove({
          id: userId,
          rating: oldRating,
        }),
      })
      .then(() => {
        database
          .collection('books')
          .doc(bookId)
          .update({
            ratingList: firebase.firestore.FieldValue.arrayUnion({
              id: userId,
              rating: bookRating,
            }),
          });
      });
  }
};
