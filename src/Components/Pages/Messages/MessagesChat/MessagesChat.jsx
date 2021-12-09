import styles from './MessagesChat.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'Components/Common/Input/Input';
import { MdSend } from 'react-icons/md';
import { getUserConversation, getContactData } from 'Services/firebaseMessages';
import { useState, useEffect } from 'react';

const MessagesChat = ({ userData, talkingContact }) => {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [contactData, setContactData] = useState({});
  useEffect(() => {
    getUserConversation(userData.uid, talkingContact, setMessages, setRoomId);
    getContactData(talkingContact, setContactData);
  }, []);
  const {
    container,
    headerContainer,
    bodyContainer,
    inputContainer,
    input,
    sendIcon,
    messageContainer,
    messageStyle,
    profilePicture,
    rightContainer,
    leftContainer,
    rightMessage,
    leftMessage,
    headerProfilePicture,
    headerContactName,
  } = styles;
  return (
    <div className={container}>
      <div className={headerContainer}>
        <img
          className={headerProfilePicture}
          src={contactData.photoURL}
          alt="profile"
        />
        <div className={headerContactName}>{contactData.displayName}</div>
      </div>
      <div className={bodyContainer}>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderTrackHorizontal={(props) => (
            <div {...props} style={{ display: 'none' }} />
          )}
        >
          {messages?.map((message) => (
            <div
              className={
                message.senderId !== userData.uid
                  ? `${messageContainer} ${rightContainer}`
                  : `${messageContainer} ${leftContainer}`
              }
            >
              <img
                className={profilePicture}
                src={contactData.photoURL}
                alt="user"
              />
              <div
                className={
                  message.senderId !== userData.uid
                    ? `${messageStyle} ${rightMessage}`
                    : `${messageStyle} ${leftMessage}`
                }
              >
                {message.message}
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
      <div className={inputContainer}>
        <Input placeholder="Write a message" className={input} />
        <MdSend className={sendIcon} />
      </div>
    </div>
  );
};

export default MessagesChat;
