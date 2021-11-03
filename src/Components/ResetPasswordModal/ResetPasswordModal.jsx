import { useState } from 'react';
import Button from 'Components/Common/Button/Button';
import Input from 'Components/Common/Input/Input';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'Services/firebaseAuth';

import styles from 'Components/ResetPasswordModal/ResetPasswordModal.module.scss';

const ResetPasswordModal = ({ toggleLogin, toggleModal }) => {
  const [email, setEmail] = useState('');

  const handleError = (error) => {
    toast.error(error);
    setEmail('');
  };

  const handleSuccess = () => {
    toast.success('Password sent with success');
    toggleLogin();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(email, handleSuccess, handleError);
  };

  const { modalContent, modalForm, submitButton, paragraph } = styles;

  return (
    <>
      <div className={modalContent}>
        <form className={modalForm} onSubmit={(e) => handleResetPassword(e)}>
          <Input
            type="text"
            name="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            type="submit"
            label="Send Recover Email"
            className={submitButton}
          />
        </form>
        <p className={paragraph} onClick={toggleLogin}>
          Cancel
        </p>
      </div>
    </>
  );
};

export default ResetPasswordModal;
