import Header from 'Components/Common/Header/Header';

import headerLogo from 'assets/headerImages/homePageLogo.svg';

const Home = () => {
  return (
    <div>
      <Header {...{ headerLogo }} title={'THE BEST SITE FOR BORROWING BOOKS'} />
    </div>
  );
};

export default Home;
