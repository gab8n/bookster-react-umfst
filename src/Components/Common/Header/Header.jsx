import styles from 'Components/Common/Header/Header.module.scss';
import NavBar from 'Components/Common/Header/NavBar/NavBar';
import Button from 'Components/Common/Button/Button';

const Header = ({ headerLogo }) => {
  const { headerContainer, headerLogoStyle, headerTitle, borrowNowButton } =
    styles;
  return (
    <header className={headerContainer}>
      <NavBar />
      <h2 className={headerTitle}>
        THE BEST SITE FOR <br /> BORROWING BOOKS
      </h2>
      <div className={borrowNowButton}>
        <Button label="Borrow Now" />
      </div>
      <img src={headerLogo} className={headerLogoStyle} alt="Header Logo" />
    </header>
  );
};

export default Header;
