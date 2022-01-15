import styles from './BookSlider.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import SlideCard from './SlideCard/SlideCard';
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const BookSlider = ({ title, books }) => {
  const [draggable, setDraggable] = useState(false);

  const {
    container,
    nextArrow,
    prevArrow,
    slideCardContainer,
    sliderContainer,
    titleStyle,
  } = styles;

  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    lazyLoad: true,
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
    beforeChange: () => setDraggable(true),
    afterChange: () => setDraggable(false),
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <MdOutlineKeyboardArrowLeft className={nextArrow} onClick={onClick} />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <MdOutlineKeyboardArrowRight className={prevArrow} onClick={onClick} />
    );
  }

  return (
    <div className={container}>
      <h2 className={titleStyle}>{title}</h2>
      <div className={sliderContainer}>
        <Slider {...settings}>
          {books.map((book) => (
            <Link
              to={`/book/${book.id}`}
              onClick={(e) => draggable && e.preventDefault()}
              className={slideCardContainer}
            >
              <SlideCard {...{ book }} />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookSlider;
