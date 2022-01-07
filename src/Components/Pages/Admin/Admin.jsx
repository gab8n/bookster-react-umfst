import styles from './Admin.module.scss';
import NavBar from './NavBar/NavBar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminUsers from './AdminUsers/AdminUsers';
import AdminOrders from './AdminOrders/AdminOrders';
import AdminBooks from './AdminBooks/AdminBooks';

const Admin = () => {
  const { container } = styles;
  const [adminTab, setAdminTab] = useState('orders');

  const { subpage } = useParams();

  return (
    <div className={container}>
      <NavBar />
      {subpage === 'users' ? (
        <AdminUsers />
      ) : subpage === 'orders' ? (
        <AdminOrders />
      ) : subpage === 'books' ? (
        <AdminBooks />
      ) : (
        <AdminUsers />
      )}
    </div>
  );
};

export default Admin;
