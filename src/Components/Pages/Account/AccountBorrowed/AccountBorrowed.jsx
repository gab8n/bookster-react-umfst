import styles from './AccountBorrowed.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUserOrders } from 'Services/firebaseUserActions';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdPendingActions } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';
import { GoPackage } from 'react-icons/go';
import { BsFillBasket2Fill } from 'react-icons/bs';
import { MdOutlineAssignmentReturned } from 'react-icons/md';
import { Link } from 'react-router-dom';
const AccountBorrowed = () => {
  const {
    title,
    container,
    orderContainer,
    lineStatusContainer,
    statusContainer,
    icon,
    iconContainer,
    statusText,
    statusActive,
    orderDataContainer,
    bookCover,
    bookCoverContainer,
    orderNumberText,
    purpleText,
    adressDataContainer,
    adressDataText,
    userDataContainer,
    userDataText,
    bookCoverLink,
  } = styles;
  const authStore = useSelector((state) => state.authStore);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders(authStore.userData.uid, setOrders);
  }, []);
  return (
    <div className={container}>
      <h3 className={title}>Borrowed Books</h3>
      {orders?.map((element) => (
        <div className={orderContainer}>
          <div className={lineStatusContainer}>
            <div className={`${statusContainer} ${statusActive}`}>
              <div className={iconContainer}>
                <MdPendingActions className={icon} />
                <span className={statusText}>Pending</span>
              </div>
            </div>
            <div
              className={
                element.status !== 'pending'
                  ? `${statusContainer} ${statusActive}`
                  : `${statusContainer}`
              }
            >
              <div className={iconContainer}>
                <AiOutlineFileDone className={icon} />
                <span className={statusText}>Processed</span>
              </div>
            </div>
            <div
              className={
                element.status !== 'pending' && element.status !== 'processed'
                  ? `${statusContainer} ${statusActive}`
                  : `${statusContainer}`
              }
            >
              <div className={iconContainer}>
                <MdDeliveryDining className={icon} />
                <span className={statusText}>Shipped</span>
              </div>
            </div>
            <div
              className={
                element.status !== 'pending' &&
                element.status !== 'processed' &&
                element.status !== 'shipped'
                  ? `${statusContainer} ${statusActive}`
                  : `${statusContainer}`
              }
            >
              <div className={iconContainer}>
                <GoPackage className={icon} />
                <span className={statusText}>Tranzit</span>
              </div>
            </div>
            <div
              className={
                element.status !== 'pending' &&
                element.status !== 'processed' &&
                element.status !== 'shipped' &&
                element.status !== 'tranzit'
                  ? `${statusContainer} ${statusActive}`
                  : `${statusContainer}`
              }
            >
              <div className={iconContainer}>
                <BsFillBasket2Fill className={icon} />
                <span className={statusText}>Delivered</span>
              </div>
            </div>
            <div
              className={
                element.status !== 'pending' &&
                element.status !== 'processed' &&
                element.status !== 'shipped' &&
                element.status !== 'tranzit' &&
                element.status !== 'delivered'
                  ? `${statusContainer} ${statusActive}`
                  : `${statusContainer}`
              }
            >
              <div className={iconContainer}>
                <MdOutlineAssignmentReturned className={icon} />
                <span className={statusText}>Returned</span>
              </div>
            </div>
          </div>
          <div className={orderDataContainer}>
            <div className={bookCoverContainer}>
              <Link to={`/book/${element.bookId}`} className={bookCoverLink}>
                <img
                  src={element.bookCover}
                  alt={'book'}
                  className={bookCover}
                />
              </Link>
              <span className={orderNumberText}>
                Order Number:
                <br /> <span className={purpleText}>{element.id}</span>
              </span>
            </div>
            <div className={adressDataContainer}>
              <span className={adressDataText}>Adress: &nbsp;</span>
              <span>
                <span className={purpleText}>State: &nbsp;</span>{' '}
                {element.state}
              </span>
              <span>
                <span className={purpleText}>City: &nbsp;</span> {element.city}
              </span>
              <span>
                <span className={purpleText}>Street: &nbsp;</span>{' '}
                {element.streetAddress}
              </span>
              <span>
                <span className={purpleText}>Zip Code: &nbsp;</span>{' '}
                {element.zipCode}
              </span>
            </div>
            <div className={userDataContainer}>
              <span className={userDataText}>User Data: &nbsp;</span>
              <span>
                <span className={purpleText}>First Name: &nbsp;</span>{' '}
                {element.firstName}
              </span>
              <span>
                <span className={purpleText}>Last Name: &nbsp;</span>{' '}
                {element.lastName}
              </span>
              <span>
                <span className={purpleText}>Phone Number: &nbsp;</span>{' '}
                {element.phone}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountBorrowed;
