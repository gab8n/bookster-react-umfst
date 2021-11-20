import Header from 'Components/Common/Header/Header';
import { useState, useEffect } from 'react';
import { getBooks } from 'Services/firebaseBooks';
import styles from './Collection.module.scss';
import BookCard from './BookCard/BookCard';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CollectionFilters from './CollectionFilters/CollectionFilters';

const Collection = () => {
  const [booksList, setBooksList] = useState([]);
  const itemsPerPage = 20;

  const { itemsContainer, pageContainer, contentContainer } = styles;

  useEffect(() => {
    getBooks(itemsPerPage, booksList[itemsPerPage], setBooksList);
  }, [itemsPerPage]);

  const handleScroll = () => {
    getBooks(itemsPerPage, booksList[booksList.length - 1], setBooksList);
  };

  const containerRef = useBottomScrollListener(handleScroll);

  return (
    <div className={pageContainer}>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <div className={contentContainer}>
        <CollectionFilters />
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
