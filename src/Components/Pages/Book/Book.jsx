import styles from './Book.module.scss';
import { useParams } from 'react-router-dom';
import Header from 'Components/Common/Header/Header';
import { getBook } from 'Services/firebaseBooks';
import { useState, useEffect } from 'react';
import Button from 'Components/Common/Button/Button';
import { FaHeart, PFaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import FeedbackStars from 'Components/Common/FeedbackStars/FeedbackStars';
import {
  checkIfBookIsInWishlist,
  addBookToWishlist,
  removeBookFromWishlist,
} from 'Services/firebaseUserActions';
import CustomModal from 'Components/Common/CustomModal/CustomModal';
import BorrowModal from 'Components/Common/BorrowModal/BorrowModal';

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
  const userId = useSelector((state) => state.authStore.userData.uid);

  const [book, setBook] = useState({});
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    getBook(id, setBook);
    checkIfBookIsInWishlist(id, userId, setIsInWishlist);
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
          <CustomModal
            title={'Borrow'}
            modalButton={
              <Button
                className={borrowButton}
                label={'BORROW'}
                startAdorment={
                  <FaShoppingCart className={borrowButtonAdorment} />
                }
              />
            }
            modalContent={<BorrowModal />}
          />

          <Button
            className={wishlistButton}
            label={'WHISHIST'}
            startAdorment={<FaRegHeart className={wishlistButtonAdorment} />}
            onClick={() =>
              isInWishlist
                ? removeBookFromWishlist(id, userId)
                : addBookToWishlist(id, userId)
            }
          />
        </div>
      </main>
    </div>
  );
};

export default Book;
