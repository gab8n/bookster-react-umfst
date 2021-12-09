import firebase from 'utils/firebaseConfig';
import uuid from 'react-uuid';

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();

export const getConversations = (userId, searchedName, setData) => {
  const userMessagesCollection = database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations')
    .orderBy('editedTime');
  const userData = database.collection('users');
  setData([]);

  userMessagesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      userData
        .doc(doc.id)
        .get()
        .then((userDoc) => {
          userDoc.data().displayName.startsWith(searchedName) &&
            setData((prevData) => [
              ...prevData,
              {
                displayName: userDoc.data().displayName,
                id: doc.id,
                photoURL: userDoc.data().photoURL,
              },
            ]);
        });
    });
  });
};
export const getAllContactableUsers = (userId, searchedName, setData) => {
  const usersCollection = database
    .collection('users')
    .where('displayName', '>=', searchedName)
    .where('displayName', '<=', searchedName + '\uf8ff');

  setData([]);
  usersCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const userInConversation = database
        .collection('userMessages')
        .doc(userId)
        .collection('conversations')
        .doc(doc.id);
      userInConversation.get().then((userDoc) => {
        !userDoc.exists &&
          doc.id !== userId &&
          setData((prevData) => [
            ...prevData,
            {
              displayName: doc.data().displayName,
              id: doc.data().uid,
              photoURL: doc.data().photoURL,
            },
          ]);
      });
    });
  });
};

export const createConversation = (userId, contactId) => {
  const roomId = uuid();
  database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations')
    .doc(contactId)
    .set({
      editedTime: firebase.firestore.Timestamp.now(),
      messages: [
        {
          message: 'I added you to my contacts',
          senderId: userId,
          timestamp: firebase.firestore.Timestamp.now(),
        },
      ],
      roomId: roomId,
      seen: false,
    })
    .then(() => {
      database
        .collection('userMessages')
        .doc(contactId)
        .collection('conversations')
        .doc(userId)
        .set({
          editedTime: firebase.firestore.Timestamp.now(),
          messages: [
            {
              message: 'I added you to my contacts',
              senderId: userId,
              timestamp: firebase.firestore.Timestamp.now(),
            },
          ],
          roomId: roomId,
          seen: false,
        })
        .then(() => {
          console.log('Conversation Created');
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUserConversation = (
  userId,
  contactId,
  setMessages,
  setRoomId
) => {
  const userMessagesCollection = database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations')
    .doc(contactId);
  userMessagesCollection.get().then((doc) => {
    if (doc.exists) {
      setMessages(doc.data().messages);
      setRoomId(doc.data().roomId);
    } else {
      setMessages(null);
      setRoomId(null);
    }
    userMessagesCollection.update({ seen: true });
  });
};
export const getContactData = (contactId, setData) => {
  const userData = database.collection('users');
  userData
    .doc(contactId)
    .get()
    .then((doc) => {
      setData({
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
      });
    });
};
