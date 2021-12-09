import Header from 'Components/Common/Header/Header';

import headerLogo from 'assets/headerImages/contactPageLogo.svg';
import ContactInfo from './ContactInfo/ContactInfo';
import styles from './Contact.module.scss';

const Contact = () => {
  const { pageContainer } = styles;
  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'CONTACT'} />
      <ContactInfo />
    </div>
  );
};

export default Contact;
