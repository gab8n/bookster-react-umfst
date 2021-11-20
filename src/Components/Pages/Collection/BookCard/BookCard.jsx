import styles from './BookCard.module.scss';
import { HiStar } from 'react-icons/hi';

const BookCard = ({ title, author, rating, thumbnail }) => {
  const {
    cardContainer,
    thumbnailStyle,
    ratingContainer,
    titleContainer,
    authorContainer,
  } = styles;
  return (
    <div className={cardContainer}>
      <img src={thumbnail} className={thumbnailStyle} />
      <h3 class={titleContainer}>{title}</h3>
      <p class={authorContainer}>{author}</p>
      <div className={ratingContainer}>
        <HiStar />
        <HiStar />
        <HiStar />
        <HiStar />
      </div>
    </div>
  );
};

export default BookCard;
