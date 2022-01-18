import CSVUpload from 'Components/CSVUpload/CSVUpload';
import styles from './AdminBooks.module.scss';
import BookList from './BookList/BookList';
import SideBar from './SideBar/SideBar';
import { getBooks } from 'Services/firebaseAdmin';
import { useState, useEffect } from 'react';
import AddBook from './AddBook/AddBook';

const AdminBooks = () => {
  const { container } = styles;
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setISBN] = useState('');
  const [genres, setGenres] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isAddBook, setIsAddBook] = useState(false);
  useEffect(() => {
    setBooks([]);
    getBooks(setBooks, null, title, authors, isbn, genres, publisher);
  }, [title, authors, isbn, genres, publisher]);

  return isAddBook ? (
    <AddBook {...{ setIsAddBook }} />
  ) : (
    <div className={container}>
      <SideBar
        {...{
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
        }}
      />
      <BookList
        {...{ books, setBooks }}
        onLoadMore={() =>
          getBooks(
            setBooks,
            books[books.length - 1],
            title,
            authors,
            isbn,
            genres,
            publisher
          )
        }
      />
    </div>
  );
};

export default AdminBooks;
