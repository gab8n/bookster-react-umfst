import styles from './UserProfilePicture.module.scss';
import CustomModal from 'Components/Common/CustomModal/CustomModal';
import ChangeProfilePictureModal from '../ChangeProfilePictureModal/ChangeProfilePictureModal';

const UserProfilePicture = ({ photoURL }) => {
  const { container, imageStyle } = styles;

  photoURL = photoURL?.replace('=s96-c', '=s400-c');
  return (
    <CustomModal
      modalButton={
        <div className={container}>
          <img
            className={imageStyle}
            src={photoURL}
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      }
      modalContent={<ChangeProfilePictureModal {...{ photoURL }} />}
    />
  );
};

export default UserProfilePicture;
