import styles from './SideNavigationBar.module.scss';
import UserProfilePicture from './UserProfilePicture/UserProfilePicture';

const SideNavigationBar = ({ photoURL }) => {
  const { container } = styles;
  return (
    <div className={container}>
      <UserProfilePicture {...{ photoURL }} />
    </div>
  );
};

export default SideNavigationBar;
