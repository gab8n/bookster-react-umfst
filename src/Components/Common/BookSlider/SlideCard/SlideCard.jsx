import styles from './SlideCard.module.scss';

const SlideCard = ({ book }) => {
  const { image } = styles;
  return (
    <>
      <img
        src={book.data().thumbnail}
        alt={book.data().title}
        className={image}
      />
    </>
  );
};

export default SlideCard;
