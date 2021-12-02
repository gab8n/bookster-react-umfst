import Button from 'Components/Common/Button/Button';
import styles from './SideNavigationBar.module.scss';
import UserProfilePicture from './UserProfilePicture/UserProfilePicture';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineSecurity, MdFavorite } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';

const SideNavigationBar = ({ photoURL, onChangeTab, currentTab }) => {
  const {
    container,
    navContainer,
    button,
    activeTab,
    adorment,
    textButton,
    userName,
  } = styles;

  return (
    <div className={container}>
      <UserProfilePicture {...{ photoURL }} />
      <h3 className={userName}>Cotoc Vasile Gabriel</h3>
      <div className={navContainer}>
        <Button
          className={
            currentTab === 'profile' ? `${button} ${activeTab}` : button
          }
          label={'Profile'}
          startAdorment={<CgProfile className={adorment} />}
          textButton={textButton}
          onClick={() => onChangeTab('profile')}
        />
        <Button
          className={
            currentTab === 'wishlist' ? `${button} ${activeTab}` : button
          }
          label={'Wishlist'}
          startAdorment={<MdFavorite className={adorment} />}
          textButton={textButton}
          onClick={() => onChangeTab('wishlist')}
        />
        <Button
          className={
            currentTab === 'borrowed' ? `${button} ${activeTab}` : button
          }
          label={'Borrowed'}
          startAdorment={<ImBooks className={adorment} />}
          textButton={textButton}
          onClick={() => onChangeTab('borrowed')}
        />
        <Button
          className={
            currentTab === 'security' ? `${button} ${activeTab}` : button
          }
          label={'Security'}
          startAdorment={<MdOutlineSecurity className={adorment} />}
          textButton={textButton}
          onClick={() => onChangeTab('security')}
        />
      </div>
    </div>
  );
};

export default SideNavigationBar;
