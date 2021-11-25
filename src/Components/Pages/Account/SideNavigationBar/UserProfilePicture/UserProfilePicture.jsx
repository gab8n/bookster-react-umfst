import styles from './UserProfilePicture.module.scss';

const UserProfilePicture = ({ photoURL }) => {
  const { container } = styles;

  photoURL = photoURL?.replace('=s96-c', '=s400-c');
  return <img className={container} src={photoURL} alt="user profile" />;
};

export default UserProfilePicture;
