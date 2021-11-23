import styles from './CollectionFilters.module.scss';
import MultiselectFilter from './MultiselectFilter/MultiselectFilter';
import { useState, useEffect } from 'react';
import { getFilters } from 'Services/firebaseBooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGenreOptions,
  setAuthorOptions,
  setPublisherOptions,
} from 'Redux/Ducks/bookCollectionFilters';

const CollectionFilters = ({
  setGenresFilter,
  setAuthorsFilter,
  setPublishersFilter,
}) => {
  const { filtersContainer } = styles;

  const dispatch = useDispatch();

  // const [genresOptions, setGenresOptions] = useState([]);

  // const [authorsOptions, setAuthorsOptions] = useState([]);

  // const [publishersOptions, setPublishersOptions] = useState([]);

  useEffect(() => {
    getFilters('genres', (data) => dispatch(setGenreOptions(data)));
    getFilters('authors', (data) => dispatch(setAuthorOptions(data)));
    getFilters('publisher', (data) => dispatch(setPublisherOptions(data)));
  }, []);
  const options = useSelector((state) => state.bookCollectionFilters.options);
  console.log(options);

  return (
    <div className={filtersContainer}>
      <MultiselectFilter
        title="GENRES"
        options={options.genres}
        onChange={setGenresFilter}
      />
      <MultiselectFilter
        title="AUTHORS"
        options={options.authors}
        onChange={setAuthorsFilter}
      />
      <MultiselectFilter
        title="PUBLISHER"
        options={options.publisher}
        onChange={setPublishersFilter}
      />
    </div>
  );
};

export default CollectionFilters;
