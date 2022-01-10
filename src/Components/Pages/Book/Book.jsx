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
  addRatingToBook,
} from 'Services/firebaseUserActions';
import CustomModal from 'Components/Common/CustomModal/CustomModal';
import BorrowModal from 'Components/Common/BorrowModal/BorrowModal';
import BookComments from './BookComments/BookComments';

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
    bookDataContainer,
  } = styles;

  const { id } = useParams();
  const authStore = useSelector((state) => state.authStore);
  const userId = authStore.userData.uid;

  const [book, setBook] = useState({});
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    getBook(id, setBook);
    checkIfBookIsInWishlist(id, userId, setIsInWishlist);
  }, []);
  const handleChangeRating = (newRating) => {
    const isFirstRating =
      book.ratingList?.filter((element) => element.id === userId).length > 0
        ? false
        : true;
    const oldRating = book.ratingList?.find(
      (element) => element.id === userId
    )?.rating;
    addRatingToBook(
      id,
      userId,
      newRating,
      isFirstRating,
      book.rating,
      book.ratingCount,
      oldRating
    );
  };

  return (
    <div className={pageContainer}>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <main className={mainContainer}>
        <div className={bookDataContainer}>
          <img src={book.thumbnail} alt={book.title} className={image} />
          <div className={dataContainer}>
            <h1 className={bookTitle}>{book.title}</h1>
            <div className={ratingContainer}>
              <FeedbackStars
                score={book.rating}
                count={book.ratingCount}
                userRating={
                  book.ratingList?.find((element) => element.id === userId)
                    ?.rating
                }
                setNewRating={handleChangeRating}
              />
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
              modalContent={<BorrowModal bookId={id} />}
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
        </div>
        <BookComments {...{ authStore }} bookId={id} />
      </main>
    </div>
  );
};

export default Book;
