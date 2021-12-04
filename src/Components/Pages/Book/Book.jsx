import styles from './Book.module.scss';
import { useParams } from 'react-router-dom';
import Header from 'Components/Common/Header/Header';
import { getBook } from 'Services/firebaseBooks';
import { useState, useEffect } from 'react';
import Button from 'Components/Common/Button/Button';
import { FaHeart, PFaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import FeedbackStars from 'Components/Common/FeedbackStars/FeedbackStars';

const Book = () => {
  const {
    pageContainer,
    mainContainer,
    image,
    dataContainer,
    bookTitle,
    bookAuthors,
    bookAuthorsContainer,
    bookPublisher,
    bookPublisherContainer,
    bookDescription,
    borrowButton,
    wishlistButton,
    borrowButtonAdorment,
    wishlistButtonAdorment,
    bookGenresContainer,
    bookGenres,
    ratingContainer,
  } = styles;
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    getBook(id, setBook);
    console.log(book);
  }, []);

  return (
    <div className={pageContainer}>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <main className={mainContainer}>
        <img src={book.thumbnail} alt={book.title} className={image} />
        <div className={dataContainer}>
          <h1 className={bookTitle}>{book.title}</h1>
          <div className={ratingContainer}>
            <FeedbackStars score={3} count={100} />
          </div>
          <label className={bookAuthorsContainer}>
            AUTOR:{' '}
            <span className={bookAuthors}>{book.authors?.toString()}</span>
          </label>
          <label className={bookPublisherContainer}>
            PUBLISHER: <span className={bookPublisher}>{book.publisher}</span>
          </label>
          <label className={bookGenresContainer}>
            GENRES:{' '}
            <span className={bookGenres}>{book.genres?.toString()}</span>
          </label>
          <p className={bookDescription}>{book.description}</p>
          <Button
            className={borrowButton}
            label={'BORROW'}
            startAdorment={<FaShoppingCart className={borrowButtonAdorment} />}
          />
          <Button
            className={wishlistButton}
            label={'WHISHIST'}
            startAdorment={<FaRegHeart className={wishlistButtonAdorment} />}
          />
        </div>
      </main>
    </div>
  );
};

export default Book;
