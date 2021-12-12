import firebase from 'utils/firebaseConfig';
import uuid from 'react-uuid';
import {
  generateRSAKeys,
  encryptRSAKeys,
  decryptRSAKeys,
  decryptString,
} from 'utils/RSAEncryption';

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
    .collection('projectVariables')
    .doc('variables')
    .get()
    .then((doc) => {
      const userEncryptedKeys = encryptRSAKeys(
        generateRSAKeys(),
        doc.data().MASTER_ENCRYPTION_PUBLIC_KEY
      );

      const contactEncryptedKeys = encryptRSAKeys(
        generateRSAKeys(),
        doc.data().MASTER_ENCRYPTION_PUBLIC_KEY
      );
      database
        .collection('userMessages')
        .doc(userId)
        .collection('conversations')
        .doc(contactId)
        .set({
          publicKey: contactEncryptedKeys.encryptedPublicKey,
          privateKey: userEncryptedKeys.encryptedPrivateKey,
          editedTime: firebase.firestore.Timestamp.now(),
          messages: [],
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
              publicKey: userEncryptedKeys.encryptedPublicKey,
              privateKey: contactEncryptedKeys.encryptedPrivateKey,
              editedTime: firebase.firestore.Timestamp.now(),
              messages: [],
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
    });
};

export const getUserConversation = (
  userId,
  contactId,
  setMessages,
  setRoomId,
  setKeys
) => {
  const userMessagesCollection = database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations')
    .doc(contactId);
  const contactMessagesCollection = database
    .collection('userMessages')
    .doc(contactId)
    .collection('conversations')
    .doc(userId);

  userMessagesCollection.get().then((doc) => {
    if (doc.exists) {
      setRoomId(doc.data().roomId);
      const decryptedKeys = decryptRSAKeys(
        doc.data().publicKey,
        doc.data().privateKey
      );
      setKeys({
        publicKey: decryptedKeys.decryptedPublicKey,
        privateKey: decryptedKeys.decryptedPrivateKey,
      });
      contactMessagesCollection.get().then((contactDoc) => {
        const contactDecryptedKeys = decryptRSAKeys(
          contactDoc.data().publicKey,
          contactDoc.data().privateKey
        );
        const messages = doc.data().messages.map((message) => {
          if (message.senderId === userId) {
            return {
              message: decryptString(
                message.message,
                contactDecryptedKeys.decryptedPrivateKey
              ),
              senderId: message.senderId,
              timestamp: message.timestamp,
            };
          } else if (message.senderId === contactId) {
            return {
              message: decryptString(
                message.message,
                decryptedKeys.decryptedPrivateKey
              ),
              senderId: message.senderId,
              timestamp: message.timestamp,
            };
          }
        });
        setMessages(messages);
      });
    } else {
      setMessages(null);
      setRoomId(null);
    }
  });
  userMessagesCollection.update({ seen: true });
};

export const addMessageOnConversation = (userId, contactId, message, seen) => {
  database
    .collection('userMessages')
    .doc(userId)
    .collection('conversations')
    .doc(contactId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        message: message.text,
        senderId: message.userId,
        timestamp: firebase.firestore.Timestamp.now(),
      }),
      seen: seen,
    });
};

export const getContactData = (contactId, setData) => {
  const userData = database.collection('users');
  userData
    .doc(contactId)
    .get()
    .then((doc) => {
      setData({
        displayName: doc.data()?.displayName,
        photoURL: doc.data()?.photoURL,
      });
    });
};
