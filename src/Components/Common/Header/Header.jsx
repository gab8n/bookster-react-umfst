import styles from 'Components/Common/Header/Header.module.scss';
import NavBar from 'Components/Common/Header/NavBar/NavBar';
import Button from 'Components/Common/Button/Button';

const Header = ({ headerLogo, title, navBarOnly }) => {
  const { headerContainer, headerLogoStyle, headerTitle, borrowNowButton } =
    styles;
  console.log(navBarOnly);
  return navBarOnly ? (
    <NavBar />
  ) : (
    <header className={headerContainer}>
      <NavBar />
      <h2 className={headerTitle}>{title}</h2>
      <div className={borrowNowButton}>
        <Button label="Borrow Now" onClick={() => console.log('veba')} />
      </div>
      {headerLogo && (
        <img src={headerLogo} className={headerLogoStyle} alt="Header Logo" />
      )}
    </header>
  );
};

export default Header;
