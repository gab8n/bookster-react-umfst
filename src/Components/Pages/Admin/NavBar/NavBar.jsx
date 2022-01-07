import { useState } from 'react';
import Button from 'Components/Common/Button/Button';
import { signOut } from 'Services/firebaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'Redux/Ducks/authStore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { MdAdminPanelSettings } from 'react-icons/md';

const NavBar = () => {
  const { container, logoContainer, icon, navContainer, link } = styles;
  const dispatch = useDispatch();

  const handleSuccess = () => {
    toast.success('Logged Out');
    dispatch(logout());
  };
  const handleError = (error) => {
    toast.error(error);
  };

  return (
    <div className={container}>
      <div className={logoContainer}>
        <MdAdminPanelSettings className={icon} />
        <h1>Admin Panel</h1>
      </div>
      <div className={navContainer}>
        <Link to="/admin/users" className={link}>
          Users
        </Link>
        <Link to="/admin/books" className={link}>
          Books
        </Link>
        <Link to="/admin/orders" className={link}>
          Orders
        </Link>
        <Button
          label="Exit"
          onClick={() => signOut(handleSuccess, handleError)}
        />
      </div>
    </div>
  );
};

export default NavBar;
