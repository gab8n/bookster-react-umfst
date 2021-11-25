import styles from './SideNavigationBar.module.scss';
import UserProfilePicture from './UserProfilePicture/UserProfilePicture';

const SideNavigationBar = () => {
  const { container } = styles;
  return (
    <div className={container}>
      <UserProfilePicture />
    </div>
  );
};

export default SideNavigationBar;
