import styles from './AdminOrders.module.scss';
import { useState, useEffect } from 'react';
import { getAllOrders } from 'Services/firebaseAdmin';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdPendingActions } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';
import { GoPackage } from 'react-icons/go';
import { BsFillBasket2Fill } from 'react-icons/bs';
import { MdOutlineAssignmentReturned } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
import Dropdown from 'Components/Common/Dropdown/Dropdown';
import Button from 'Components/Common/Button/Button';
import { setOrderStatus } from 'Services/firebaseAdmin';
import { getNextWeek, getDifferenceBetweenDates } from 'utils/dateFunctions';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const options = [
    'all',
    'pending',
    'processed',
    'shipped',
    'tranzit',
    'delivered',
    'returned',
  ];
  useEffect(() => {
    getAllOrders(setOrders);
  }, []);

  const handleChangeStatus = (orderId, status, bookId) => {
    const nextStatus =
      status === 'pending'
        ? 'processed'
        : status === 'processed'
        ? 'shipped'
        : status === 'shipped'
        ? 'tranzit'
        : status === 'tranzit'
        ? 'delivered'
        : 'returned';
    setOrderStatus(orderId, nextStatus, bookId);
  };
  const {
    container,
    contentContainer,
    sideBar,
    ordersListContainer,
    title,
    orderContainer,
    bookCover,
    dataContainer,
    statusIconContainer,
    icon,
    boldText,
    infoContainer,
    changeStatusContainer,
    returnedIcon,
    textGreen,
    textRed,
  } = styles;
  return (
    <div className={container}>
      <div className={contentContainer}>
        <div className={sideBar}>
          <h2 className={title}>ORDERS</h2>
          <Dropdown
            {...{ options }}
            defaultOption={selectedOption}
            onSelectOption={(option) => setSelectedOption(option)}
          />
        </div>
        <div className={ordersListContainer}>
          {orders
            ?.filter((element) =>
              selectedOption === 'all'
                ? element
                : element.status === selectedOption
            )
            .map((element) => (
              <div className={orderContainer}>
                <img src={element.bookCover} className={bookCover} alt="book" />
                <div className={dataContainer}>
                  <div className={infoContainer}>
                    <span className={boldText}>
                      Order Number: &nbsp;
                      <br />
                    </span>
                    <span>{element.id}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>
                      Date: &nbsp;
                      <br />
                    </span>
                    <span>{element.date.toDate().toGMTString()}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>Status:</span>
                    <div className={statusIconContainer}>
                      {element.status === 'pending' ? (
                        <MdPendingActions className={icon} />
                      ) : element.status === 'processed' ? (
                        <AiOutlineFileDone className={icon} />
                      ) : element.status === 'shipped' ? (
                        <MdDeliveryDining className={icon} />
                      ) : element.status === 'tranzit' ? (
                        <GoPackage className={icon} />
                      ) : element.status === 'delivered' ? (
                        <BsFillBasket2Fill className={icon} />
                      ) : (
                        <MdOutlineAssignmentReturned className={icon} />
                      )}
                      <span>{element.status}</span>
                    </div>
                  </div>
                </div>
                <div className={dataContainer}>
                  <div className={infoContainer}>
                    <span className={boldText}>State/Province: &nbsp;</span>
                    <br />
                    <span>{element.state}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>City: &nbsp;</span>
                    <br />
                    <span>{element.city}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>Adress: &nbsp;</span>
                    <br />
                    <span>{element.streetAddress}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>Zip code: &nbsp;</span>
                    <span>{element.zipCode}</span>
                  </div>
                </div>
                <div className={dataContainer}>
                  <div className={infoContainer}>
                    <span className={boldText}>First Name: &nbsp;</span>
                    <span>{element.firstName}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>Last Name: &nbsp;</span>
                    <span>{element.lastName}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>Phone: &nbsp;</span>
                    <span>{element.phone}</span>
                  </div>
                  <div className={infoContainer}>
                    <span className={boldText}>User ID: &nbsp;</span>
                    <br />
                    <span>{element.userId}</span>
                  </div>
                </div>
                <div className={dataContainer}>
                  <div className={changeStatusContainer}>
                    {element.status !== 'returned' ? (
                      <Button
                        label={
                          element.status === 'pending'
                            ? 'Set status to processed'
                            : element.status === 'processed'
                            ? 'Set status to shipped'
                            : element.status === 'shipped'
                            ? 'Set status to tranzit'
                            : element.status === 'tranzit'
                            ? 'Set status to delivered'
                            : 'Set status to returned'
                        }
                        onClick={() =>
                          handleChangeStatus(
                            element.id,
                            element.status,
                            element.bookId
                          )
                        }
                      />
                    ) : (
                      <GrStatusGood className={returnedIcon} />
                    )}
                  </div>
                  {element.status === 'delivered' && element.timeout ? (
                    <span
                      className={
                        getDifferenceBetweenDates(
                          getNextWeek(
                            getNextWeek(getNextWeek(element.timeout.toDate()))
                          )
                        ).timeStatus === 'in'
                          ? textGreen
                          : textRed
                      }
                    >
                      <span className={boldText}>
                        Remaining Time: <br />
                      </span>
                      {
                        getDifferenceBetweenDates(
                          getNextWeek(
                            getNextWeek(getNextWeek(element.timeout.toDate()))
                          )
                        ).time
                      }
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
