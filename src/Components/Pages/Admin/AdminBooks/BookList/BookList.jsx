import styles from './BookList.module.scss';
import { FaEye } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { setBookAviability, deleteBook } from 'Services/firebaseAdmin';
import CustomModal from 'Components/Common/CustomModal/CustomModal';

const BookList = ({ books, onLoadMore, setBooks }) => {
  const {
    container,
    contentContainer,
    bookContainer,
    image,
    bookTitleText,
    bookAuthorText,
    textContainer,
    loadMore,
    boldText,
    iconContainer,
    icon,
    iconDelete,
    aviableContainer,
    aviableIcon,
    unaviableContainer,
    bookInfoContainer,
    infoText,
  } = styles;
  const handleChangeAviability = (id, aviability) => {
    setBookAviability(id, aviability);
  };
  const handleDeleteBook = (id) => {
    deleteBook(id);
  };

  return (
    <div className={container}>
      <div className={contentContainer}>
        {books.map((book) => (
          <div key={book.id} className={bookContainer}>
            <img
              src={book.data().thumbnail}
              alt={book.title}
              className={image}
            />
            <div className={textContainer}>
              <span className={bookTitleText}>{book.data().title}</span>
              <span className={bookAuthorText}>{book.data().authors}</span>
            </div>
            <div className={textContainer}>
              <span>
                <span className={boldText}>ISBN:&nbsp;</span>
                {book.data().isbn}
              </span>
              <span>
                <span className={boldText}>ID:&nbsp;</span>
                {book.id}
              </span>
            </div>
            <div className={iconContainer}>
              <span
                className={
                  book.data().aviable
                    ? `${aviableContainer}`
                    : `${unaviableContainer}`
                }
                onClick={() =>
                  handleChangeAviability(book.id, !book.data().aviable)
                }
              >
                {book.data().aviable ? 'Aviable' : 'Not Aviable'}
                <CgArrowsExchangeAltV className={aviableIcon} />
              </span>
            </div>
            <div className={iconContainer}>
              <CustomModal
                title={'Book Info'}
                modalButton={<FaEye className={icon} />}
                modalContent={
                  <div className={bookInfoContainer}>
                    <span className={infoText}>
                      <span className={boldText}>ID:&nbsp;</span>
                      {book.id}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Title:&nbsp;</span>
                      {book.data().title}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Authors:&nbsp;</span>
                      {book.data().authors}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Pages:&nbsp;</span>
                      {book.data().pageCount}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>ISBN:&nbsp;</span>
                      {book.data().isbn}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Description:&nbsp;</span>
                      {book.data().description}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Publisher:&nbsp;</span>
                      {book.data().publisher}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Publication Year:&nbsp;</span>
                      {book.data().publicationYear}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Rating:&nbsp;</span>
                      {book.data().rating}
                    </span>
                    <span className={infoText}>
                      <span className={boldText}>Rating Count:&nbsp;</span>
                      {book.data().ratingCount}
                    </span>
                  </div>
                }
              />
            </div>
            <div className={iconContainer}>
              <RiDeleteBinFill
                className={iconDelete}
                onClick={() => {
                  if (
                    window.confirm('Are you sure you wish to delete this item?')
                  )
                    handleDeleteBook(book.id);
                }}
              />
            </div>
          </div>
        ))}
        <div key="addMore" className={loadMore} onClick={onLoadMore}>
          Load More
        </div>
      </div>
    </div>
  );
};

export default BookList;
