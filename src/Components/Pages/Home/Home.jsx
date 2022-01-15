import Header from 'Components/Common/Header/Header';
import styles from './Home.module.scss';
import headerLogo from 'assets/headerImages/homePageLogo.svg';
import BookSlider from 'Components/Common/BookSlider/BookSlider';
import Footer from 'Components/Common/Footer/Footer';
import { getBooksForSlider } from 'Services/firebaseBooks';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Home = () => {
  const { pageContainer, mainContainer } = styles;
  const authStore = useSelector((state) => state.authStore);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooksForSlider(setBooks, authStore.userData.uid);
  }, []);
  return (
    <div className={pageContainer}>
      <Header {...{ headerLogo }} title={'THE BEST SITE FOR BORROWING BOOKS'} />
      <main className={mainContainer}>
        <BookSlider title={'ACTION'} books={books.slice(0, 19)} />
        <BookSlider title={'ADVENTURE'} books={books.slice(20, 39)} />
        <BookSlider title={'ROMANCE'} books={books.slice(40, 59)} />
        <BookSlider title={'PSICHOLOGY'} books={books.slice(60, 79)} />
        <BookSlider title={'YOUNG ADULT'} books={books.slice(80, 99)} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
