import { useState } from 'react';
import Button from 'Components/Common/Button/Button';
import Input from 'Components/Common/Input/Input';

import styles from 'Components/ResetPasswordModal/ResetPasswordModal.module.scss';

const ResetPasswordModal = ({ toggleLogin }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
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
