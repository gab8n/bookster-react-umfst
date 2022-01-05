import Dropdown from 'Components/Common/Dropdown/Dropdown';
import styles from './CollectionSortFilters.module.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import { CgPlayListRemove } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { setDefault } from 'Redux/Ducks/bookCollectionFilters';

const CollectionSortFilters = ({
  sortOptions,
  defaultSortOption,
  onSelectOption,
  filters,
}) => {
  const {
    container,
    dropdownContainer,
    sortText,
    selectedFiltersContainer,
    currentsFiltersText,
    selectedFilterText,
    icon,
    clearFiltersIcon,
  } = styles;
  const dispatch = useDispatch();
  return (
    <div className={container}>
      <div className={selectedFiltersContainer}>
        <h3 className={currentsFiltersText}>Filters :</h3>
        {filters?.authors.map((element) => (
          <span className={selectedFilterText}>
            <GoPrimitiveDot className={icon} />
            {element}
          </span>
        ))}
        {filters?.genres.map((element) => (
          <span className={selectedFilterText}>
            <GoPrimitiveDot className={icon} />
            {element}
          </span>
        ))}
        {filters?.publisher.map((element) => (
          <span className={selectedFilterText}>
            <GoPrimitiveDot className={icon} />
            {element}
          </span>
        ))}
        {filters.authors.length ||
        filters.publisher.length ||
        filters.genres.length ? (
          <CgPlayListRemove
            className={clearFiltersIcon}
            onClick={() => dispatch(setDefault())}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={dropdownContainer}>
        <h3 className={sortText}>Sort by: </h3>
        <Dropdown
          options={sortOptions}
          defaultOption={defaultSortOption}
          onSelectOption={onSelectOption}
        />
      </div>
    </div>
  );
};

export default CollectionSortFilters;
