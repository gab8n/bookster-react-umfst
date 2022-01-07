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
