import styles from 'Components/Pages/AboutUs/RoadToKnowledge/RoadToKnowledge.module.scss';
import RoadToKnowledgeCard from 'Components/Pages/AboutUs/RoadToKnowledge/RoadToKnowledgeCard/RoadToKnowledgeCard';

import giveBook from 'assets/roadToKnowledgeImages/giveBook.svg';
import bookshelf from 'assets/roadToKnowledgeImages/bookshelf.svg';
import readingTime from 'assets/roadToKnowledgeImages/readingTime.svg';

const RoadToKnowledge = () => {
  const { container } = styles;

  const giveBookText =
    "See what books your friends are reading. Track the books you're reading, have read, and want to read. Check out your personalized book sugestions. Enjoy a great lecture in a rainy summer afternoon!";
  const bookshelfText =
    'You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations. Chances are your friends are discussing their favorite (and least favorite) books on Bookster.';
  const readingTimeText =
    "You can create 'bookshelves' to organize what you've read (or want to read). You can comment on each other's reviews. You can find your next favorite book. And on this journey with your friends you can explore new territory, gather information, and expand your mind.";
  return (
    <div className={container}>
      <RoadToKnowledgeCard text={giveBookText} image={giveBook} />
      <RoadToKnowledgeCard text={bookshelfText} image={bookshelf} />
      <RoadToKnowledgeCard text={readingTimeText} image={readingTime} />
    </div>
  );
};

export default RoadToKnowledge;
