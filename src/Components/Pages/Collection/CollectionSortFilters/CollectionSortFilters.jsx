import Dropdown from 'Components/Common/Dropdown/Dropdown';
import styles from './CollectionSortFilters.module.scss';

const CollectionSortFilters = ({
  sortOptions,
  defaultSortOption,
  onSelectOption,
}) => {
  const { container, dropdownContainer, sortText } = styles;

  return (
    <div className={container}>
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
