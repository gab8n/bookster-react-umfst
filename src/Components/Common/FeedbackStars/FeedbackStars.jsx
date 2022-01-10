import { HiStar } from 'react-icons/hi';
import styles from './FeedbackStars.module.scss';
import { useState, useEffect } from 'react';

const FeedbackStars = ({
  disabled,
  score,
  count,
  userRating,
  setNewRating,
}) => {
  // console.log(userRating);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  const { on, off, starStyle, container, button, scoreStyle, starsContainer } =
    styles;
  return (
    <div className={container}>
      <div className={starsContainer}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= (hover || rating)
                  ? `${button} ${on}`
                  : `${button} ${off}`
              }
              onClick={() => setNewRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={starStyle}>&#9733;</span>
            </button>
          );
        })}
      </div>
      <span className={scoreStyle}>{score}</span>
      <span className={scoreStyle}>{'( ' + count + ' )'}</span>
    </div>
  );
};

export default FeedbackStars;
