import {FaBook} from 'react-icons/fa'
import { Link } from 'react-router-dom';

import styles from 'Components/Common/Header/NavBar/Logo/Logo.module.scss'

const Logo = () => {
    const {logoContainer, logoTitle, logoIcon} = styles;
    return ( 
        <Link to='/' className={logoContainer}>
            <FaBook className={logoIcon} />
            <h1 className={logoTitle}>Bookster</h1>
        </Link>
     );
}
 
export default Logo;