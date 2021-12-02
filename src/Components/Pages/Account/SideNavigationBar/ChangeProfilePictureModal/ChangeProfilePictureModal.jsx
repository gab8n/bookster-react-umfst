import Input from 'Components/Common/Input/Input';
import { useState } from 'react';
import Button from 'Components/Common/Button/Button';
import { changeProfilePicture } from 'Services/firebaseAuth';
import styles from './ChangeProfilePictureModal.module.scss';

const ChangeProfilePictureModal = ({ photoURL, toggleModal }) => {
  const [image, setImage] = useState({
    imageName: '',
    imageURL: '',
    imageFile: '',
  });
  const handleSubmit = (e) => {
    changeProfilePicture(image.imageFile);
  };

  const handleUploadPicture = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage((prevState) => ({
        ...prevState,
        imageName: e.target.files[0].name,
        imageFile: e.target.files[0],
      }));
      let FR = new FileReader();

      FR.addEventListener('load', function (e) {
        setImage((prevState) => ({
          ...prevState,
          imageURL: e.target.result,
        }));
      });

      FR.readAsDataURL(e.target.files[0]);
      console.log(image);
    }
  };

  const {
    modalContent,
    input,
    uploadImageContainer,
    imagePreview,
    uploadButton,
    button,
  } = styles;

  return (
    <div className={modalContent}>
      <Input
        className={input}
        placeholder={'Image Name'}
        disabled
        value={image.imageName}
      />
      <div className={uploadImageContainer}>
        <img
          className={imagePreview}
          src={image.imageURL ? image.imageURL : photoURL}
          alt="user profile"
        />
        <label className={uploadButton}>
          <input
            type="file"
            accept=".jpg"
            onChange={(e) => handleUploadPicture(e)}
          />
          Upload
        </label>
      </div>
      <Button className={button} label={'Submit'} onClick={handleSubmit} />
    </div>
  );
};

export default ChangeProfilePictureModal;
