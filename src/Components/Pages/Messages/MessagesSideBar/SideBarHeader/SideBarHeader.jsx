import styles from './SideBarHeader.module.scss';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { HiChatAlt2 } from 'react-icons/hi';

const SideBarHeader = ({ photoURL, onClick, addContactState }) => {
  const { container, thumbnail, title, button, titlePhotoContainer } = styles;
  return (
    <div className={container}>
      <div className={titlePhotoContainer}>
        <img className={thumbnail} src={photoURL} alt="user" />
        <h2 className={title}>Conversations</h2>
      </div>
      {addContactState ? (
        <HiChatAlt2 className={button} onClick={onClick} />
      ) : (
        <MdPersonAddAlt1 className={button} onClick={onClick} />
      )}
    </div>
  );
};

export default SideBarHeader;
