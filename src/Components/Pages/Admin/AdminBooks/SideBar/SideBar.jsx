import Input from 'Components/Common/Input/Input';
import styles from './SideBar.module.scss';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

const SideBar = ({
  title,
  authors,
  isbn,
  genres,
  publisher,
  setAuthors,
  setTitle,
  setISBN,
  setGenres,
  setPublisher,
  setIsAddBook,
}) => {
  const {
    container,
    titleText,
    filterContainer,
    filterSpan,
    input,
    addBookContainer,
    addBookText,
    addBookIcon,
  } = styles;
  return (
    <div className={container}>
      <h1 className={titleText}>Filters</h1>
      <div className={filterContainer}>
        <span className={filterSpan}>Title:</span>
        <Input
          className={input}
          value={title}
          disabled={
            authors === '' && isbn === '' && genres === '' && publisher === ''
              ? false
              : true
          }
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={filterContainer}>
        <span className={filterSpan}>Authors:</span>
        <Input
          className={input}
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          disabled={
            title === '' && isbn === '' && genres === '' && publisher === ''
              ? false
              : true
          }
        />
      </div>
      <div className={filterContainer}>
        <span className={filterSpan}>ISBN:</span>
        <Input
          className={input}
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
          disabled={
            title === '' && authors === '' && genres === '' && publisher === ''
              ? false
              : true
          }
        />
      </div>
      <div className={filterContainer}>
        <span className={filterSpan}>Genres:</span>
        <Input
          className={input}
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          disabled={
            title === '' && isbn === '' && authors === '' && publisher === ''
              ? false
              : true
          }
        />
      </div>
      <div className={filterContainer}>
        <span className={filterSpan}>Publisher:</span>
        <Input
          className={input}
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          disabled={
            authors === '' && isbn === '' && genres === '' && title === ''
              ? false
              : true
          }
        />
      </div>
      <div className={addBookContainer} onClick={() => setIsAddBook(true)}>
        <span className={addBookText}>Add Book</span>
        <AiOutlineAppstoreAdd className={addBookIcon} />
      </div>
    </div>
  );
};

export default SideBar;
