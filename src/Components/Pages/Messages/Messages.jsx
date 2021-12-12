import styles from './Messages.module.scss';
import Header from 'Components/Common/Header/Header';
import headerLogo from 'assets/headerImages/messagesPageLogo.svg';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import { auth } from 'Services/firebaseAuth.js';
import MessagesSideBar from './MessagesSideBar/MessagesSideBar';
import MessagesChat from './MessagesChat/MessagesChat';

const Messages = () => {
  const userData = useSelector((state) => state.authStore.userData);
  const [talkingContact, setTalkingContact] = useState();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState(auth.currentUser?.uid);
  const [socket, setSocket] = useState();
  const [online, setOnline] = useState();

  const disconnectFromRoom = () => {
    socket.disconnect();
  };
  useEffect(() => {
    const newSocket = io.connect('/', { query: { id } });
    setSocket(newSocket);
    // return () => socket?.disconnect();
  }, []);

  const { pageContainer, contentContainer, mainContainer } = styles;

  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'CHAT'} navBarOnly={true} />
      <div className={contentContainer}>
        <MessagesSideBar {...{ userData, talkingContact, setTalkingContact }} />
        <MessagesChat {...{ userData, talkingContact, socket }} />
      </div>
    </div>
  );
};

export default Messages;
