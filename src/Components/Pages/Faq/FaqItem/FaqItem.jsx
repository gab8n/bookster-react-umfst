import { React, useState } from 'react';

import { FaChevronCircleUp } from 'react-icons/fa';
import styles from './FaqItem.module.scss';
const {
  faqItem,
  aswerQuestionTitle,
  faqItemText,
  questionContainer,
  questionTitle,
  question,
  faqDropdownIcon,
  answerContainer,
  answer,
  hiddenAnswer,
  questionOnAnswerOpened,
  rotateIcon,
} = styles;

const FaqItem = ({ questionText, answerText }) => {
  const [isOpened, setOpenedStatus] = useState(false);
  const toggleOpenClose = () => {
    setOpenedStatus(!isOpened);
  };
  return (
    <div className={faqItem}>
      <div
        className={
          isOpened
            ? `${questionContainer}`
            : `${questionContainer} ${questionOnAnswerOpened}`
        }
      >
        <h3 className={`${questionTitle} ${aswerQuestionTitle}`}>Q.</h3>
        <p className={`${question} ${faqItemText}`}>{questionText}</p>
        <FaChevronCircleUp
          className={
            isOpened
              ? `${faqDropdownIcon}`
              : ` ${faqDropdownIcon}  ${rotateIcon} `
          }
          onClick={toggleOpenClose}
        />
      </div>
      <div
        className={
          isOpened ? `${answerContainer}` : `${answerContainer} ${hiddenAnswer}`
        }
      >
        <h3 className={aswerQuestionTitle}>A.</h3>
        <p className={`${answer} ${faqItemText}`}>{answerText}</p>
      </div>
    </div>
  );
};

export default FaqItem;
