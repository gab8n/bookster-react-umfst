import styles from './Footer.module.scss';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  const { container, iconsContainer, icon, copyright } = styles;
  return (
    <div className={container}>
      <span className={copyright}>@copyrightUMFST</span>
      <div className={iconsContainer}>
        <FaFacebookSquare className={icon} />
        <FaInstagram className={icon} />
        <FaTwitterSquare className={icon} />
      </div>
    </div>
  );
};

export default Footer;
