import { useState } from 'react';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from 'Services/firebase';
import googleIcon from 'assets/google-icon.svg';

import styles from 'Components/LoginModal/LoginModal.module.scss';

const LoginModal = ({ toggleRegister, toggleResetPassword }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(credentials.email, credentials.password);
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
          />
          <Input
            type="password"
            name="Password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button type="submit" label="Login" className={submitButton} />
        </form>
        <div className={loginGoogleAuth} onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="google icon" className={googleIconStyle} />
          <div className={googleAuthText}>Sign In with Google</div>
        </div>
        <p className={paragraph} onClick={toggleRegister}>
          Forgot your password?
        </p>

        <p className={paragraph} onClick={toggleResetPassword}>
          New user ? Create an account
        </p>
      </div>
    </>
  );
};

export default LoginModal;
