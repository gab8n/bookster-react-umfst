import Header from 'Components/Common/Header/Header';
import styles from 'Components/Pages/AboutUs/AboutUs.module.scss';
import headerLogo from 'assets/headerImages/aboutUsPageLogo.svg';
import RoadToKnowledge from 'Components/Pages/AboutUs/RoadToKnowledge/RoadToKnowledge';
import AboutUsIntro from './AboutUsIntro/AboutUsIntro';
import AboutUsCounter from './AboutUsCounter/AboutUsCounter';
import Footer from 'Components/Common/Footer/Footer';

const AboutUs = () => {
  const { aboutUsContainer, subheader } = styles;
  return (
    <div className={aboutUsContainer}>
      <Header {...{ headerLogo }} title={'ABOUT US'} navBarOnly={true} />
      <div className={subheader}>
        <AboutUsIntro />
        <AboutUsCounter />
      </div>
      <RoadToKnowledge />
      <Footer />
    </div>
  );
};

export default AboutUs;
