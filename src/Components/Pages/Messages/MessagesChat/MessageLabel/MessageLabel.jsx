import styles from './MessageLabel.module.scss';

const MessageLabel = ({ photoURL, isContactMessage, message }) => {
  const {
    messageContainer,
    messageStyle,
    profilePicture,
    rightContainer,
    leftContainer,
    rightMessage,
    leftMessage,
  } = styles;
  return (
    <div
      className={
        !isContactMessage
          ? `${messageContainer} ${rightContainer}`
          : `${messageContainer} ${leftContainer}`
      }
    >
      <img className={profilePicture} src={photoURL} alt="user" />
      <div
        className={
          !isContactMessage
            ? `${messageStyle} ${rightMessage}`
            : `${messageStyle} ${leftMessage}`
        }
      >
        {message}
      </div>
    </div>
  );
};

export default MessageLabel;
