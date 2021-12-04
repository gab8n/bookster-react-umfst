import Header from 'Components/Common/Header/Header';
import styles from './Home.module.scss';
import headerLogo from 'assets/headerImages/homePageLogo.svg';
import BookSlider from 'Components/Common/BookSlider/BookSlider';

const Home = () => {
  const { pageContainer, mainContainer } = styles;
  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'THE BEST SITE FOR BORROWING BOOKS'} />
      <main className={mainContainer}>
        <BookSlider title={'ACTION'} />
        <BookSlider title={'ADVENTURE'} />
        <BookSlider title={'ROMANCE'} />
        <BookSlider title={'PSICHOLOGY'} />
        <BookSlider title={'YOUNG ADULT'} />
      </main>
    </div>
  );
};

export default Home;
