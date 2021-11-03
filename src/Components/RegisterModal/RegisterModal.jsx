import { useState } from 'react';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import { createUserWithEmailAndPassword } from 'Services/firebaseAuth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserData } from 'Redux/Ducks/authStore';
import styles from 'Components/RegisterModal/RegisterModal.module.scss';

const RegisterModal = ({ toggleLogin, toggleModal }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleError = (error) => {
    toast.error(error);
    setCredentials({ ...credentials, email: '', password: '' });
  };

  const handleSuccess = (data) => {
    toast.success('Succesfull Register');
    dispatch(setUserData(data));
    toggleModal();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      credentials.username,
      credentials.email,
      credentials.password,
      handleSuccess,
      handleError
    );
  };

  const { modalContent, modalForm, submitButton, paragraph } = styles;

  return (
    <>
      <div className={modalContent}>
        <form className={modalForm} onSubmit={(e) => handleRegister(e)}>
          <Input
            type="text"
            name="Username"
            placeholder="Username"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
          />
          <Input
            type="text"
            name="Email"
            placeholder="Email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
          />
          <Input
            type="password"
            name="Password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
          />
          <Button type="submit" label="Register" className={submitButton} />
        </form>
        <p className={paragraph} onClick={toggleLogin}>
          New user ? Create an account
        </p>
      </div>
    </>
  );
};

export default RegisterModal;
