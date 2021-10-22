import styles from 'Components/Common/Header/NavBar/NavBar.module.scss'
import Logo from 'Components/Common/Header/NavBar/Logo/Logo';
import { Link } from 'react-router-dom';
import Button from 'Components/Common/Button/Button';

const NavBar = () => {

    const {navbarContainer, menuContainer, menuButton,loginButton} = styles;
    return ( 
    <nav className={navbarContainer}>
        <Logo />
        <div className={menuContainer}>
            <Link to="/collection"className={menuButton} >Books</Link>
            <Link to="/aboutus"className={menuButton} >About Us</Link>
            <Link to="/faq"className={menuButton} >Faq</Link>
            <Link to="/contact"className={menuButton} >Contact</Link>
            <Button label="Login" className={`${loginButton} ${menuButton}`} />
        </div>
    </nav> );
}
 
export default NavBar;