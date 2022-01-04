import Input from 'Components/Common/Input/Input';
import styles from './CollectionSearch.module.scss';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const CollectionSearch = ({ onSubmit }) => {
  const { container, inputContainer, input, inputIcon } = styles;

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={container}>
      <form
        className={inputContainer}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(searchTerm);
        }}
      >
        <Input
          className={input}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className={inputIcon} onClick={() => onSubmit(searchTerm)} />
      </form>
    </div>
  );
};

export default CollectionSearch;
