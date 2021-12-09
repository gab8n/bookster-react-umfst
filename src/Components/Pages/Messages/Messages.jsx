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

  // useEffect(() => {
  //   socket?.on('message', (data) => {
  //     let temp = messages;
  //     temp.push({
  //       userId: data.userId,
  //       username: data.username,
  //       text: data.text,
  //     });
  //     setMessages([...temp]);
  //     setOnline(data.online);
  //     console.log(data.online);
  //   });
  //   return () => socket?.emit('disconecting');
  // }, [socket]);

  // useEffect(() => {
  //   const newSocket = io.connect('/', { query: { id } });
  //   setSocket(newSocket);
  // }, [id]);

  // const sendData = () => {
  //   if (name !== '') {
  //     socket.emit('joinRoom', { username: name });
  //     //if empty error message pops up and returns to the same page
  //   } else {
  //     alert('username and roomname are must !');
  //     window.location.reload();
  //   }
  // };
  // const disconnectFromSocket = () => {
  //   socket?.emit('disconecting');
  //   // socket?.disconnect();
  // };

  // const sendMessage = () => {
  //   if (message !== '') {
  //     socket.emit('chat', message);
  //     setMessage('');
  //   }
  // };

  const { pageContainer, contentContainer, mainContainer } = styles;

  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'CHAT'} navBarOnly={true} />
      <div className={contentContainer}>
        <MessagesSideBar {...{ userData, talkingContact, setTalkingContact }} />
        <MessagesChat {...{ userData, talkingContact }} />
      </div>
    </div>
  );
};

export default Messages;
