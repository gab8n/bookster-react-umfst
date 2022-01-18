import styles from './BorrowModal.module.scss';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import AdressMapInput from './AdressMapInput/AdressMapInput';
import {
  getUserBoorrowBookData,
  createBorrowRequest,
} from 'Services/firebaseUserActions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BorrowModal = ({ bookId, toggleModal }) => {
  const userData = useSelector((state) => state.authStore.userData);
  const {
    modalContent,
    modalForm,
    phoneNumberInput,
    dropdownContainer,
    twoElementsOnRow,
    input,
  } = styles;

  useEffect(() => {
    getUserBoorrowBookData(userData.uid, setUserInfo);
  }, []);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    streetAddress: '',
    zipCode: '',
    state: '',
  });
  const handleError = (error) => {
    toast.error(error);
    toggleModal();
  };
  const handleSuccess = (message) => {
    toast.success(message);
    toggleModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userInfo.phone.length === 0 ||
      userInfo.city.length === 0 ||
      userInfo.streetAddress.length === 0 ||
      userInfo.zipCode.length === 0 ||
      userInfo.state.length === 0
    ) {
      toast.error('Please fill all the fields');
    } else {
      createBorrowRequest(
        bookId,
        userData.uid,
        userInfo,
        handleError,
        handleSuccess
      );
    }
  };

  return (
    <div className={modalContent}>
      <form className={modalForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={twoElementsOnRow}>
          <Input
            placeholder="First Name"
            name="firstName"
            onChange={(e) =>
              setUserInfo((prevState) => {
                return { ...prevState, firstName: e.target.value };
              })
            }
            value={userInfo.firstName}
            className={input}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            onChange={(e) =>
              setUserInfo((prevState) => {
                return { ...prevState, lastName: e.target.value };
              })
            }
            value={userInfo.lastName}
            className={input}
          />
        </div>
        <AdressMapInput
          name="streetAddress"
          value={userInfo.streetAddress}
          placeholder="Street Address"
          onChange={setUserInfo}
          className={input}
        />
        <div className={twoElementsOnRow}>
          <Input
            placeholder="City"
            name="city"
            onChange={(e) =>
              setUserInfo((prevState) => {
                return { ...prevState, city: e.target.value };
              })
            }
            value={userInfo.city}
            className={input}
          />
          <Input
            placeholder="State"
            name="state"
            onChange={(e) =>
              setUserInfo((prevState) => {
                return { ...prevState, state: e.target.value };
              })
            }
            value={userInfo.state}
            className={input}
          />
        </div>
        <Input
          placeholder="Zip Code"
          name="zipCode"
          onChange={(e) =>
            setUserInfo((prevState) => {
              return { ...prevState, zipCode: e.target.value };
            })
          }
          value={userInfo.zipCode}
          className={input}
        />
        <PhoneInput
          country={'ro'}
          value={userInfo.phone}
          onChange={(e) =>
            setUserInfo((prevState) => {
              return { ...prevState, phone: e.target };
            })
          }
          preferredCountries={['ro', 'it', 'hu', 'cw', 'kz']}
          containerClass={phoneNumberInput}
          buttonClass={dropdownContainer}
          inputProps={{
            name: 'phone',
            required: true,
          }}
        />

        <Button label="Borrow" type="submit" />
      </form>
    </div>
  );
};

export default BorrowModal;
