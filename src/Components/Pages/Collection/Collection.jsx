import Header from 'Components/Common/Header/Header';
import { useState, useEffect } from 'react';
import { getBooks } from 'Services/firebaseBooks';
import styles from './Collection.module.scss';
import BookCard from './BookCard/BookCard';
import { useDispatch } from 'react-redux';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CollectionFilters from './CollectionFilters/CollectionFilters';

const Collection = () => {
  const [booksList, setBooksList] = useState([]);
  const [genresFilter, setGenresFilter] = useState([]);
  const [authorsFilter, setAuthorsFilter] = useState([]);
  const [publishersFilter, setPublishersFilter] = useState([]);

  const dispatch = useDispatch();

  const itemsPerPage = 20;
  const filters = { genresFilter, authorsFilter, publishersFilter };
  const { itemsContainer, pageContainer, contentContainer } = styles;

  useEffect(() => {
    setBooksList([]);
    getBooks(itemsPerPage, booksList[itemsPerPage], setBooksList, filters);
  }, [itemsPerPage, genresFilter, authorsFilter, publishersFilter]);

  const handleScroll = () => {
    getBooks(
      itemsPerPage,
      booksList[booksList.length - 1],
      setBooksList,
      filters
    );
  };

  const containerRef = useBottomScrollListener(handleScroll);

  return (
    <div className={pageContainer}>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <div className={contentContainer}>
        <CollectionFilters
          {...{ setGenresFilter, setAuthorsFilter, setPublishersFilter }}
        />
        <div className={itemsContainer} ref={containerRef}>
          {booksList.map((element) => {
            return (
              <BookCard
                thumbnail={element.data().thumbnail}
                title={element.data().title}
                author={element.data().authors[0]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
