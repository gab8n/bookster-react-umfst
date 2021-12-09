import firebase from 'utils/firebaseConfig';

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();

export const getConverstions = (userId) => {
  const userMessagesCollection = database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations');

  userMessagesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      console.log(doc.id);
    });
  });
};
export const getAllContactableUsers = (setData) => {
  const usersCollection = database.collection('users');
  usersCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // setData(doc.data());
      console.log(doc.data());
    });
  });
};
