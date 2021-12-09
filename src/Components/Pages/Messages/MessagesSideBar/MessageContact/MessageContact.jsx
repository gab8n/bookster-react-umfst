import styles from './MessageContact.module.scss';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import { BiMessageRoundedDots } from 'react-icons/bi';

const MessageContact = ({ contact, isContact, talkingContact, onClick }) => {
  const {
    container,
    innerContainer,
    namePhotoContainer,
    name,
    thumbnail,
    button,
    active,
  } = styles;
  return (
    <div className={container}>
      <div
        className={
          talkingContact ? `${innerContainer} ${active}` : innerContainer
        }
      >
        <div className={namePhotoContainer}>
          <img className={thumbnail} src={contact.photoURL} alt="user" />
          <h2 className={name}>{contact.displayName}</h2>
        </div>
        {isContact ? (
          <IoIosAddCircleOutline className={button} onClick={onClick} />
        ) : (
          <BiMessageRoundedDots className={button} onClick={onClick} />
        )}
      </div>
    </div>
  );
};

export default MessageContact;
