import styles from 'Components/Common/Header/NavBar/UserIcon/UserIcon.module.scss';
import userAvatar from 'assets/userAvatar.svg';
import { useState } from 'react';
import Button from 'Components/Common/Button/Button';
import { signOut } from 'Services/firebaseAuth';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/Ducks/authStore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserIcon = () => {
  const dispatch = useDispatch();
  const {
    userIconStyle,
    userIconContainer,
    userIconDropdown,
    dropdownButton,
    visible,
    outlined,
  } = styles;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleSuccess = () => {
    toast.success('Logged Out');
    dispatch(logout());
  };
  const handleError = (error) => {
    toast.error(error);
  };

  return (
    <>
      <div
        className={
          !isVisible ? userIconContainer : `${userIconContainer} ${outlined}`
        }
        onClick={() => {
          toggleVisibility();
        }}
      >
        <img src={userAvatar} className={userIconStyle} alt="user icon" />
        <div
          className={
            !isVisible ? userIconDropdown : `${userIconDropdown} ${visible}`
          }
        >
          <Link to="/account" onClick={(e) => {}}>
            <Button label="Account" className={dropdownButton} />
          </Link>
          <Button
            label="Messages"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={dropdownButton}
          />
          <Button
            label="Logout"
            onClick={(e) => {
              e.stopPropagation();
              console.log('logout');
              signOut(handleSuccess, handleError);
            }}
            className={dropdownButton}
          />
        </div>
      </div>
    </>
  );
};

export default UserIcon;
