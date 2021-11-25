import Header from 'Components/Common/Header/Header';

// import headerLogo from 'assets/headerImages/accountPageLogo.svg';
import SideNavigationBar from './SideNavigationBar/SideNavigationBar';
import styles from './Account.module.scss';

const Account = () => {
  const { pageContainer, sideNavBar, contentContainer } = styles;
  return (
    <>
      <Header title={'ACCOUNT'} navBarOnly={true} />
      <div className={pageContainer}>
        <SideNavigationBar />
        <div className={contentContainer}></div>
      </div>
    </>
  );
};

export default Account;
