import styles from './MessagesSideBar.module.scss';
import Input from 'Components/Common/Input/Input';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  getConversations,
  getAllContactableUsers,
} from 'Services/firebaseMessages';
import { useState, useEffect } from 'react';
import SideBarHeader from './SideBarHeader/SideBarHeader';
import MessageContact from './MessageContact/MessageContact';
import { createConversation } from 'Services/firebaseMessages';

const MessagesSideBar = ({ userData, talkingContact, setTalkingContact }) => {
  const [isContactList, setIsContactList] = useState(false);
  const toggleContactList = () => {
    setSearchInput('');
    setIsContactList(!isContactList);
  };
  const [searchInput, setSearchInput] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    isContactList
      ? getAllContactableUsers(userData.uid, searchInput, setConversations)
      : getConversations(userData.uid, searchInput, setConversations);
  }, [isContactList, searchInput]);

  const { sidebarContainer, input, searchContainer, itemsContainer } = styles;

  const handleContactClick = (contactId) => {
    isContactList
      ? createConversation(userData.uid, contactId)
      : setTalkingContact(contactId);
  };

  return (
    <nav className={sidebarContainer}>
      <SideBarHeader
        photoURL={userData.photoURL}
        onClick={toggleContactList}
        addContactState={isContactList}
      />
      <div className={searchContainer}>
        <Input
          placeholder={'Search contact'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={input}
        />
      </div>
      <div className={itemsContainer}>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderTrackHorizontal={(props) => (
            <div {...props} style={{ display: 'none' }} />
          )}
        >
          {conversations?.map((conversation) => (
            <MessageContact
              contact={conversation}
              // key={conversation.id}
              isContact={isContactList}
              talkingContact={talkingContact === conversation.id ? true : false}
              onClick={() => handleContactClick(conversation.id)}
            />
          ))}
        </Scrollbars>
      </div>
    </nav>
  );
};

export default MessagesSideBar;
