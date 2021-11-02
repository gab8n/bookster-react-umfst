import Header from 'Components/Common/Header/Header';

import headerLogo from 'assets/headerImages/aboutUsPageLogo.svg';

const AboutUs = () => {
  return (
    <>
      <Header {...{ headerLogo }} title={'ABOUT US'} />
    </>
  );
};

export default AboutUs;
