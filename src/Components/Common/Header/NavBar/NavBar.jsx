import styles from 'Components/Common/Header/NavBar/NavBar.module.scss';
import Logo from 'Components/Common/Header/NavBar/Logo/Logo';
import { Link } from 'react-router-dom';
import Button from 'Components/Common/Button/Button';
import CustomModal from 'Components/Common/CustomModal/CustomModal';
import { useState } from 'react';
import LoginModal from 'Components/LoginModal/LoginModal';
import RegisterModal from 'Components/RegisterModal/RegisterModal';
import ResetPasswordModal from 'Components/ResetPasswordModal/ResetPasswordModal';

const NavBar = () => {
  const { navbarContainer, menuContainer, menuButton, loginButton } = styles;
  const [modalType, setModalType] = useState('login');
  const toggleLogin = () => {
    setModalType('login');
  };
  const toggleRegister = () => {
    setModalType('register');
  };
  const toggleResetPassword = () => {
    setModalType('reset');
  };

  return (
    <nav className={navbarContainer}>
      <Logo />
      <div className={menuContainer}>
        <Link to="/collection" className={menuButton}>
          Books
        </Link>
        <Link to="/aboutus" className={menuButton}>
          About Us
        </Link>
        <Link to="/faq" className={menuButton}>
          Faq
        </Link>
        <Link to="/contact" className={menuButton}>
          Contact
        </Link>
        {/* <Button label="Login" className={`${loginButton} ${menuButton}`} /> */}
        <CustomModal
          modalButton={
            <Button label="Login" className={`${loginButton} ${menuButton}`} />
          }
          modalContent={
            modalType === 'login' ? (
              <LoginModal {...{ toggleRegister, toggleResetPassword }} />
            ) : modalType === 'register' ? (
              <RegisterModal {...{ toggleLogin }} />
            ) : (
              <ResetPasswordModal {...{ toggleLogin }} />
            )
          }
        />
      </div>
    </nav>
  );
};

export default NavBar;
