import styles from './FaqSubPage.module.scss';
const FaqSubPage = ({ subpage }) => {
  const {
    faqSubPageContent,
    faqSubPageParagraphText,
    faqSubPageParagraphTitle,
    faqSubPageTitle,
    paragraphContainer,
  } = styles;
  const pageContent = require('../FaqSubPageContent.json');
  return (
    <div className={faqSubPageContent}>
      <h2 className={faqSubPageTitle}>{pageContent[subpage].title}</h2>
      {pageContent[subpage].paragraph.map((element) => {
        return (
          <div className={paragraphContainer}>
            <h3 className={faqSubPageParagraphTitle}>{element.title}</h3>
            <p className={faqSubPageParagraphText}>{element.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FaqSubPage;
