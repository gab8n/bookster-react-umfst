import Header from 'Components/Common/Header/Header';

import headerLogo from 'assets/headerImages/contactPageLogo.svg';
import ContactInfo from './ContactInfo/ContactInfo';
import styles from './Contact.module.scss';
import ContactForm from './ContactForm/ContactForm';
import Footer from 'Components/Common/Footer/Footer';

const Contact = () => {
  const { pageContainer } = styles;
  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'CONTACT'} />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default Contact;
