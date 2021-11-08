import styles from 'Components/Pages/AboutUs/AboutUsIntro/AboutUsIntro.module.scss';

const AboutUsIntro = () => {
  const { question, definition, container, firstWord } = styles;

  return (
    <div className={container}>
      <h3 className={question}>What is Bookster?</h3>
      <h4 className={definition}>
        <span className={firstWord}>Bookster</span> is the first modern public
        library in Romania. Our story started in march 2021 and since then we've
        helped over 77,000 readers share their passion for readingwith other
        people. We believe that reading should be accessible to everyone , at 0
        to no cost.
      </h4>
    </div>
  );
};

export default AboutUsIntro;
