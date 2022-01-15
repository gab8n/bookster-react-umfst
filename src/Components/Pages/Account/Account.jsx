import Header from 'Components/Common/Header/Header';

import SideNavigationBar from './SideNavigationBar/SideNavigationBar';
import styles from './Account.module.scss';
import { useState, useEffect } from 'react';
import { getUserData } from 'Services/firebaseAuth';
import { toast } from 'react-toastify';
import AccountSettings from './AccountSettings/AccountSettings';
import AccountWishlist from './AccountWishlist/AccountWishlist';
import AccountBorrowed from './AccountBorrowed/AccountBorrowed';
import AccountSecurity from './AccountSecurity/AccountSecurity';
import { useParams } from 'react-router-dom';

const Account = () => {
  const [userAccountData, setUserAccountData] = useState();
  const [accountTab, setAccountTab] = useState('profile');

  const { subpage } = useParams();
  const handleError = (error) => {
    toast.error(error);
  };
  const handleSuccess = (data) => {
    setUserAccountData(data);
  };

  useEffect(() => {
    getUserData(handleSuccess, handleError);
    console.log(subpage);
  }, [subpage]);

  const { pageContainer, contentContainer } = styles;
  return (
    <>
      <Header title={'ACCOUNT'} navBarOnly={true} />
      <div className={pageContainer}>
        <SideNavigationBar
          photoURL={userAccountData?.photoURL}
          currentTab={subpage}
        />

        <main className={contentContainer}>
          {subpage === 'profile' ? (
            <AccountSettings {...{ userAccountData }} />
          ) : subpage === 'wishlist' ? (
            <AccountWishlist {...{ userAccountData }} />
          ) : subpage === 'borrowed' ? (
            <AccountBorrowed />
          ) : subpage === 'security' ? (
            <AccountSecurity />
          ) : (
            <AccountSettings {...{ userAccountData }} />
          )}
        </main>
      </div>
    </>
  );
};

export default Account;
