import Header from 'Components/Common/Header/Header';

// import headerLogo from 'assets/headerImages/accountPageLogo.svg';
import SideNavigationBar from './SideNavigationBar/SideNavigationBar';
import styles from './Account.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'Services/firebaseAuth';
import { toast } from 'react-toastify';

const Account = () => {
  const [userAccountData, setUserAccountData] = useState();
  const handleError = (error) => {
    toast.error(error);
  };

  const handleSuccess = (data) => {
    setUserAccountData(data);
  };

  useEffect(() => {
    getUserData(handleSuccess, handleError);
  }, []);

  const { pageContainer, contentContainer } = styles;
  return (
    <>
      <Header title={'ACCOUNT'} navBarOnly={true} />
      <div className={pageContainer}>
        <SideNavigationBar photoURL={userAccountData?.photoURL} />
        <div className={contentContainer}></div>
      </div>
    </>
  );
};

export default Account;
