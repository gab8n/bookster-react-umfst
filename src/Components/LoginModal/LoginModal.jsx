import { useState } from 'react';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from 'Services/firebaseAuth';
import googleIcon from 'assets/google-icon.svg';
import { toast } from 'react-toastify';
import { setUserData } from 'Redux/Ducks/authStore';
import { useDispatch } from 'react-redux';

import styles from 'Components/LoginModal/LoginModal.module.scss';

const LoginModal = ({ toggleRegister, toggleResetPassword, toggleModal }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const handleError = (error) => {
    toast.error(error);
    setCredentials({ email: '', password: '' });
  };

  const handleSuccess = (data) => {
    toast.success('Succesfull Log In');
    dispatch(setUserData(data));
    toggleModal();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
      handleSuccess,
      handleError
    );
  };
  const handleGoogleLogin = () => {
    signInWithGoogle(handleSuccess, handleError);
  };

  const {
    modalContent,
    modalForm,
    loginGoogleAuth,
    submitButton,
    paragraph,
    googleAuthText,
    googleIconStyle,
  } = styles;
  return (
    <>
      <div className={modalContent}>
        <form className={modalForm} onSubmit={(e) => handleLogin(e)}>
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
          <Button type="submit" label="Login" className={submitButton} />
        </form>
        <div className={loginGoogleAuth} onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="google icon" className={googleIconStyle} />
          <div className={googleAuthText}>Sign In with Google</div>
        </div>
        <p className={paragraph} onClick={toggleResetPassword}>
          Forgot your password?
        </p>

        <p className={paragraph} onClick={toggleRegister}>
          New user ? Create an account
        </p>
      </div>
    </>
  );
};

export default LoginModal;
