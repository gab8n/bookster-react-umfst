import Header from 'Components/Common/Header/Header';
import styles from './Faq.module.scss';
import headerLogo from 'assets/headerImages/faqPageLogo.svg';
import FaqItem from './FaqItem/FaqItem';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { ImBoxRemove } from 'react-icons/im';
import { FaUserAlt } from 'react-icons/fa';
import FaqSubPage from './FaqSubPage/FaqSubPage';

const Faq = () => {
  const {
    container,
    contentContainer,
    itemsContainer,
    boxesContainer,
    boxContainer,
    boxText,
    boxIcon,
    boxLink,
  } = styles;
  const faqData = [
    {
      question: 'How do I pick up the borrowed book?',
      answer:
        'You can borrow books from our headquarters in Tirgu Mures, Str. Nicolae Grigorescu 15B, Ground floor. At the entrance is a white library. There you will find the books reserved on our site.',
    },
    {
      question: 'How do I return the book?',
      answer:
        'You can return the book to our headquarters in Tirgu Mures, Str. Nicolae Grigorescu 15B, Ground floor. At the entrance is a white library. There you will find the books reserved on our site.',
    },
    {
      question: 'How do I recognize my book?',
      answer:
        'You will easily recognize the borrowed book because your name is written on the label on the back of it, near the return deadline.',
    },
    {
      question: 'How long can I keep a book?',
      answer:
        'The loan term for books is one month, and for articles it is three weeks. If you want to see when each loan , go to your profile page in the Profile section.',
    },
    {
      question: 'Can I receive the ordered books at the office?',
      answer:
        'Bookster books can be delivered to your office or home by subscribing to the delivery services offered by your company. We would be happy to tell your colleagues about this and bring the good habit of reading in the company where you work.',
    },
  ];
  const { subpage } = useParams();

  return (
    <div className={container}>
      <Header {...{ headerLogo }} title={'FAQ'} />
      {!subpage ? (
        <div className={contentContainer}>
          <div className={itemsContainer}>
            {faqData.map(({ question, answer }) => (
              <FaqItem questionText={question} answerText={answer} />
            ))}
          </div>
          <div className={boxesContainer}>
            <div className={boxContainer}>
              <Link to="/faq/shipping" className={boxLink}>
                <MdOutlineDeliveryDining className={boxIcon} />
                <span className={boxText}>Borrow & Delivery</span>
              </Link>
            </div>
            <div className={boxContainer}>
              <Link to="/contact" className={boxLink}>
                <AiOutlineMail className={boxIcon} />
                <span className={boxText}>Contact</span>
              </Link>
            </div>
            <div className={boxContainer}>
              <Link to="/faq/return" className={boxLink}>
                <ImBoxRemove className={boxIcon} />
                <span className={boxText}>Return</span>
              </Link>
            </div>
            <div className={boxContainer}>
              <Link to="/faq/account" className={boxLink}>
                <FaUserAlt className={boxIcon} />
                <span className={boxText}>Account</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <FaqSubPage {...{ subpage }} />
      )}
    </div>
  );
};

export default Faq;
