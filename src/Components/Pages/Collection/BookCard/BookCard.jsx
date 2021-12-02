import styles from './BookCard.module.scss';
import { HiStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import NoImage from 'assets/no-image.jpg';

const BookCard = ({ title, author, rating, thumbnail, id }) => {
  const {
    cardContainer,
    thumbnailStyle,
    ratingContainer,
    titleContainer,
    authorContainer,
    color,
    colorsecondary,
  } = styles;
  return (
    <div className={cardContainer}>
      <Link to={`/book/${id}`}>
        <img
          src={thumbnail}
          className={thumbnailStyle}
          alt="book cover"
          onError={(e) => {
            e.target.error = null;
            e.target.src = NoImage;
          }}
        />
      </Link>
      <Link className={titleContainer} to={`/book/${id}`}>
        <h3>{title}</h3>
      </Link>

      <p className={authorContainer}>{author}</p>
      <div className={ratingContainer}>
        <HiStar className={color} />
        <HiStar className={color} />
        <HiStar className={color} />
        <HiStar className={colorsecondary} />
        <HiStar className={colorsecondary} />
      </div>
    </div>
  );
};

export default BookCard;
