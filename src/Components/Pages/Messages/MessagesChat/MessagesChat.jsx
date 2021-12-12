import styles from './MessagesChat.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'Components/Common/Input/Input';
import { MdSend } from 'react-icons/md';
import {
  getUserConversation,
  getContactData,
  addMessageOnConversation,
} from 'Services/firebaseMessages';
import { useState, useEffect, useRef } from 'react';
import MessageLabel from './MessageLabel/MessageLabel';

import { encryptString, decryptString } from 'utils/RSAEncryption';

const MessagesChat = ({ userData, talkingContact, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newAddedMessages, setNewAddedMessages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [contactData, setContactData] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [online, setOnline] = useState();
  const [keys, setKeys] = useState();
  const scrollbarRef = useRef(null);

  useEffect(() => {
    if (talkingContact) {
      setNewAddedMessages([]);
      getUserConversation(
        userData.uid,
        talkingContact,
        setMessages,
        setRoomId,
        setKeys
      );
      getContactData(talkingContact, setContactData);
    }
  }, [talkingContact]);

  const handleSendMessage = (message) => {
    const encryptedMessage = encryptString(message, keys.publicKey);

    sendMessage(encryptedMessage);
    setNewAddedMessages((prevArray) => [
      ...prevArray,
      { message: message, senderId: userData.uid },
    ]);
    if (online)
      addMessageOnConversation(
        userData.uid,
        talkingContact,
        { text: encryptedMessage, userId: userData.uid },
        true
      );
    else {
      addMessageOnConversation(
        userData.uid,
        talkingContact,
        { text: encryptedMessage, userId: userData.uid },
        true
      );
      addMessageOnConversation(
        talkingContact,
        userData.uid,
        { text: encryptedMessage, userId: userData.uid },
        false
      );
    }
  };
  const handleReceiveMessage = (message) => {
    console.log('message', message);
    console.log('keys', keys);
    const decryptedMessage = decryptString(message, keys.privateKey);

    setNewAddedMessages((prevArray) => [
      ...prevArray,
      { message: decryptedMessage, senderId: talkingContact },
    ]);
    addMessageOnConversation(
      userData.uid,
      talkingContact,
      { text: message, userId: talkingContact },
      true
    );
  };

  const joinRoom = () => {
    roomId &&
      socket?.emit('joinRoom', {
        roomId: roomId,
        username: userData.displayName,
      });
  };
  const sendMessage = (message) => {
    socket.emit('chat', message);
  };

  useEffect(() => {
    joinRoom();
  }, [roomId]);

  useEffect(() => {
    console.log('socket', keys);
    socket?.on('message', (data) => {
      setOnline(data.online);
      if (data.text && data.userId === talkingContact) {
        console.log(keys);
        keys && handleReceiveMessage(data.text);
      }
    });
  }, [socket, talkingContact, keys?.privateKey]);

  useEffect(() => {
    if (newAddedMessages.length > 0 || messages.length > 0) {
      scrollbarRef.current.scrollToBottom();
    }
  }, [newAddedMessages, messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      handleSendMessage(newMessage.trim());

      setNewMessage('');
    }
  };

  const {
    container,
    headerContainer,
    bodyContainer,
    inputContainer,
    input,
    sendIcon,
    headerProfilePicture,
    headerContactName,
    headerProfilePictureContainer,
    statusDott,
    onlineStatus,
    offlineStatus,
  } = styles;
  return (
    <div className={container}>
      <div className={headerContainer}>
        <div className={headerProfilePictureContainer}>
          <img
            className={headerProfilePicture}
            src={contactData.photoURL}
            alt="profile"
          />
          <div
            className={
              online
                ? `${statusDott} ${onlineStatus}`
                : `${statusDott} ${offlineStatus}`
            }
          ></div>
        </div>
        <div className={headerContactName}>{contactData.displayName}</div>
      </div>
      <div className={bodyContainer}>
        <Scrollbars
          ref={scrollbarRef}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderTrackHorizontal={(props) => (
            <div {...props} style={{ display: 'none' }} />
          )}
        >
          {messages?.map((message) => (
            <MessageLabel
              message={message.message}
              photoURL={
                message.senderId === userData.uid
                  ? userData.photoURL
                  : contactData.photoURL
              }
              isContactMessage={
                message.senderId === userData.uid ? false : true
              }
            />
          ))}
          {newAddedMessages?.map((message) => (
            <MessageLabel
              message={message.message}
              photoURL={
                message.senderId === userData.uid
                  ? userData.photoURL
                  : contactData.photoURL
              }
              isContactMessage={
                message.senderId === userData.uid ? false : true
              }
            />
          ))}
        </Scrollbars>
      </div>
      <form onSubmit={handleSubmit} className={inputContainer}>
        <Input
          placeholder="Write a message"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
          className={input}
        />
        <MdSend className={sendIcon} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default MessagesChat;
