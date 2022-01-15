import styles from './AccountWishlist.module.scss';
import { useState, useEffect } from 'react';
import {
  getWishlistBooks,
  removeBookFromWishlist,
} from 'Services/firebaseUserActions';
import Button from 'Components/Common/Button/Button';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AccountWishlist = ({ userAccountData }) => {
  const [wishlist, setWishlist] = useState([]);
  const {
    container,
    bookContainer,
    icon,
    button,
    buttonsContainer,
    image,
    whishlistTitle,
    booksContainer,
  } = styles;
  useEffect(() => {
    setWishlist([]);
    if (userAccountData) {
      getWishlistBooks(userAccountData.wishlist, setWishlist);
    }
  }, []);
  const handleDeleteFromWhishlist = (bookId) => {
    removeBookFromWishlist(bookId, userAccountData.uid);
    setWishlist(wishlist.filter((book) => book.id !== bookId));
  };
  return (
    <div className={container}>
      <h2 className={whishlistTitle}>Whishlist</h2>
      <div className={booksContainer}>
        {wishlist.map((book) => (
          <div className={bookContainer}>
            <img src={book.thumbnail} alt={book.title} className={image} />
            <div className={buttonsContainer}>
              <Link to={`/book/${book.id}`}>
                <Button label="Borrow" className={button} />
              </Link>
              <MdOutlineDelete
                className={icon}
                onClick={() => handleDeleteFromWhishlist(book.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountWishlist;
