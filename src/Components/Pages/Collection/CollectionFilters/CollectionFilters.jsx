import styles from './CollectionFilters.module.scss';
import MultiselectFilter from './MultiselectFilter/MultiselectFilter';
import { useState, useEffect } from 'react';
import { getFilters } from 'Services/firebaseBooks';
import { useDispatch, useSelector } from 'react-redux';
import { setOptions, setFilters } from 'Redux/Ducks/bookCollectionFilters';

const CollectionFilters = ({}) => {
  const { filtersContainer } = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    getFilters('genres', (data) => dispatch(setOptions(data, 'GENRE')));
    getFilters('authors', (data) => dispatch(setOptions(data, 'AUTHOR')));
    getFilters('publisher', (data) => dispatch(setOptions(data, 'PUBLISHER')));
  }, []);
  const options = useSelector((state) => state.bookCollectionFilters.options);

  return (
    <div className={filtersContainer}>
      <MultiselectFilter
        title="GENRES"
        options={options.genres}
        onChange={(position) => dispatch(setFilters(position, 'GENRE'))}
      />
      <MultiselectFilter
        title="AUTHORS"
        options={options.authors}
        onChange={(position) => dispatch(setFilters(position, 'AUTHOR'))}
      />
      <MultiselectFilter
        title="PUBLISHER"
        options={options.publisher}
        onChange={(position) => dispatch(setFilters(position, 'PUBLISHER'))}
      />
    </div>
  );
};

export default CollectionFilters;
