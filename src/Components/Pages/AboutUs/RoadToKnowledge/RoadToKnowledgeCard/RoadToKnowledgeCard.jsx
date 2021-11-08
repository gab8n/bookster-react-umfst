import styles from 'Components/Pages/AboutUs/RoadToKnowledge/RoadToKnowledgeCard/RoadToKnowledgeCard.module.scss';

const RoadToKnowledgeCard = ({ image, text }) => {
  const { cardContainer, cardImage, cardText } = styles;
  return (
    <div className={cardContainer}>
      <img src={image} className={cardImage} alt="road to knowledge" />
      <p className={cardText}>{text}</p>
    </div>
  );
};

export default RoadToKnowledgeCard;
