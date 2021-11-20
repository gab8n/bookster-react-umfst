import styles from './CollectionFilters.module.scss';
import MultiselectFilter from './MultiselectFilter/MultiselectFilter';

const CollectionFilters = () => {
  const { filtersContainer } = styles;

  return (
    <div className={filtersContainer}>
      <MultiselectFilter />
      <MultiselectFilter />
      <MultiselectFilter />
    </div>
  );
};

export default CollectionFilters;
