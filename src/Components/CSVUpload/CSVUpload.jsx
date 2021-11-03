import { addBookToCollection } from 'Services/firebaseBooks';
import { CSVReader } from 'react-papaparse';
import React from 'react';

const handleOpenDialog = (e) => {
  // Note that the ref is set async, so it might be null at some point
  if (buttonRef.current) {
    buttonRef.current.open(e);
  }
};
const handleSuccess = () => {
  console.log('added with sucess');
};
const handleError = (error) => {
  console.log(error);
};

const handleOnFileLoad = (data) => {
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');
  let bookData;
  for (let i = 1; i <= 1000; i++) {
    bookData = {
      title: data[i].data[1],
      isbn: data[i].data[0],
      authors: [data[i].data[2]],
      genres: ['fantasty', 'action', 'adventure'],
      pageCount: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      publicationYear: data[i].data[3],
      publisher: data[i].data[4],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla orci mi, finibus quis erat sed, pulvinar vulputate purus. Ut vitae fermentum est, eget volutpat lectus. Cras viverra ultricies urna, eu porta nisl malesuada eget.',
      thumbnail: data[i].data[7],
    };
    addBookToCollection(bookData, handleSuccess, handleError);
  }
};

const handleOnError = (err, file, inputElem, reason) => {
  console.log(err);
};

const handleOnRemoveFile = (data) => {
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');
};
const buttonRef = React.createRef();

const handleRemoveFile = (e) => {
  // Note that the ref is set async, so it might be null at some point
  if (buttonRef.current) {
    buttonRef.current.removeFile(e);
  }
};
const CSVUpload = () => {
  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      header={true}
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }) => (
        <aside
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <button
            type="button"
            onClick={handleOpenDialog}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              width: '40%',
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            Browse file
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              height: 45,
              lineHeight: 2.5,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 13,
              paddingTop: 3,
              width: '60%',
            }}
          >
            {file && file.name}
          </div>
          <button
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={handleRemoveFile}
          >
            Remove
          </button>
        </aside>
      )}
    </CSVReader>
  );
};

export default CSVUpload;
