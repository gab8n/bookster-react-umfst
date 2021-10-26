import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from 'Components/Common/Button/Button';

import styles from 'Components/Common/CustomModal/CustomModal.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const CustomModal = ({ modalButton, modalContent }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    modalStyle,
    overlayStyle,
    modalHeader,
    modalCloseButton,
    modalTitle,
  } = styles;

  return (
    <>
      {React.cloneElement(modalButton, { onClick: toggleModal })}

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleModal}
        className={modalStyle}
        overlayClassName={overlayStyle}
      >
        <div className={modalHeader}>
          <h3 className={modalTitle}>Log In</h3>
          <Button
            label="&#10006;"
            className={modalCloseButton}
            onClick={toggleModal}
          />
        </div>

        {React.cloneElement(modalContent, { ...{ toggleModal } })}
      </Modal>
    </>
  );
};

export default CustomModal;
