import Header from 'Components/Common/Header/Header';
import { useState, useEffect } from 'react';
import { getBooks } from 'Services/firebaseBooks';
import styles from './Collection.module.scss';
import BookCard from './BookCard/BookCard';
import { useDispatch, useSelector } from 'react-redux';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CollectionFilters from './CollectionFilters/CollectionFilters';
import { clearFilters } from 'Redux/Ducks/bookCollectionFilters';
import CollectionSearch from './CollectionSearch/CollectionSearch';
import CollectionSortFilters from './CollectionSortFilters/CollectionSortFilters';

const Collection = () => {
  const [booksList, setBooksList] = useState([]);
  const dispatch = useDispatch();
  const filters = useSelector(
    (state) => state.bookCollectionFilters.currentFilters
  );

  const itemsPerPage = 20;

  const sortOptions = ['Newest', 'Oldest', 'A-Z', 'Z-A', 'Most Popular'];
  const defaultSortOption = 'Newest';
  const [selectedSortOption, setSelectedSortOption] =
    useState(defaultSortOption);

  const handleSortOptionChanged = (option) => {
    setSelectedSortOption(option);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChanged = (term) => {
    setSearchTerm(term);
  };
  const {
    itemsContainer,
    pageContainer,
    contentContainer,
    collectionContainer,
  } = styles;

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, []);

  useEffect(() => {
    setBooksList([]);
    getBooks(
      itemsPerPage,
      booksList[itemsPerPage],
      setBooksList,
      filters,
      selectedSortOption,
      searchTerm
    );
  }, [itemsPerPage, filters, selectedSortOption, searchTerm]);

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
    <div className={pageContainer} ref={containerRef}>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <CollectionSearch onSubmit={(value) => handleSearchTermChanged(value)} />
      <div className={contentContainer}>
        <CollectionFilters />
        <div className={collectionContainer}>
          <CollectionSortFilters
            {...{ sortOptions, defaultSortOption, filters }}
            onSelectOption={handleSortOptionChanged}
          />
          <div className={itemsContainer}>
            {booksList.map((element) => {
              return (
                <BookCard
                  thumbnail={element.data().thumbnail}
                  title={element.data().title}
                  author={element.data().authors[0]}
                  id={element.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
