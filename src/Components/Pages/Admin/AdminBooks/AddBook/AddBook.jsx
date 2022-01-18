import styles from './AddBook.module.scss';
import { useEffect, useState } from 'react';
import Button from 'Components/Common/Button/Button';
import Input from 'Components/Common/Input/Input';
import MultiSelectInput from 'Components/Common/MultiSelectInput/MultiSelectInput';
import { addBook } from 'Services/firebaseAdmin';

const AddBook = ({ setIsAddBook }) => {
  const {
    container,
    form,
    buttonCancel,
    cancelButtonContainer,
    leftSideContainer,
    rightSideContainer,
    input,
    twoInputsContainer,
    textarea,
    imageUploadContainer,
    coverPhoto,
    uploadButton,
  } = styles;
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isbn, setISBN] = useState('');
  const [genres, setGenres] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [rating, setRating] = useState();
  const [ratingCount, setRatingCount] = useState();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState();
  const [publicationYear, setPublicationYear] = useState();

  const handleAddBook = (e) => {
    e.preventDefault();
    const bookData = {
      authors: authors,
      aviable: true,
      description: description,
      genres: genres,
      isbn: isbn,
      pageCount: pageCount,
      publicationYear: publicationYear,
      publisher: publisher,
      rating: rating,
      ratingCount: ratingCount,
      thumbnail: image,
      timestamp: Date.now(),
      title: title,
    };
    if (
      title === '' ||
      authors === '' ||
      isbn === '' ||
      genres === '' ||
      publisher === '' ||
      rating === '' ||
      ratingCount === '' ||
      image === '' ||
      description === '' ||
      pageCount === '' ||
      publicationYear === ''
    ) {
      alert('Please fill all fields');
    } else {
      addBook(bookData);
    }
  };

  const encriptCoverPhoto = (e) => {
    console.log(e.target.files[0]);
    if ((e.target.files, e.target.files[0])) {
      let FR = new FileReader();

      FR.addEventListener('load', function (e) {
        setImage(e.target.result);
      });

      FR.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={container}>
      <div className={cancelButtonContainer}>
        <Button
          label="Go back"
          onClick={() => setIsAddBook(false)}
          className={buttonCancel}
        />
      </div>

      <form className={form} onSubmit={(e) => handleAddBook(e)}>
        <div className={leftSideContainer}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={input}
          />
          <MultiSelectInput
            onChange={(value) => setAuthors(value)}
            defaultValue={authors}
            label={'Authors'}
            name="author"
          />
          <MultiSelectInput
            onChange={(value) => setGenres(value)}
            defaultValue={genres}
            label={'Genres'}
            name="genres"
          />
          <Input
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setISBN(e.target.value)}
            className={input}
          />

          <Input
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className={input}
          />
          <div className={twoInputsContainer}>
            <Input
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={input}
            />
            <Input
              placeholder="Rating Count"
              value={ratingCount}
              onChange={(e) => setRatingCount(e.target.value)}
              className={input}
            />
          </div>
          <div className={twoInputsContainer}>
            <Input
              placeholder="Page Count"
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
              className={input}
            />
            <Input
              placeholder="Publication Year"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className={input}
            />
          </div>
          <textarea
            rows="4"
            className={textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={rightSideContainer}>
          <Input
            placeholder="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={input}
          />
          <div className={imageUploadContainer}>
            <img
              src={image}
              className={coverPhoto}
              alt="cover"
              onError={(e) =>
                (e.target.src = 'https://i.ibb.co/JzLPY0Q/no-image.jpg')
              }
              alt="CoverPhoto"
            />
            <label className={`${uploadButton} `}>
              <input
                type="file"
                accept=".jpg"
                onChange={(e) => encriptCoverPhoto(e)}
              />
              Upload
            </label>
          </div>
          <Button type="submit" label="Add" />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
