import styles from 'Components/Pages/AboutUs/AboutUsCounter/AboutUsCounter.module.scss';
import aboutUsPageLogo from 'assets/headerImages/aboutUsPageLogo.svg';
import CounterAnimation from './CounterAnimation/CounterAnimation';

const AboutUsCounter = () => {
  const { container, counterContainer, imageContainer, image } = styles;

  return (
    <div className={container}>
      <div className={imageContainer}>
        <img className={image} src={aboutUsPageLogo} alt="aboutUsPageLogo" />
      </div>
      <div className={counterContainer}>
        <CounterAnimation label={'Users'} number={79} unit={'K'} duration={2} />
        <CounterAnimation label={'Loans'} number={4} unit={'M'} duration={2} />
        <CounterAnimation
          label={'Books'}
          number={113}
          unit={'K'}
          duration={2}
        />
      </div>
    </div>
  );
};

export default AboutUsCounter;
