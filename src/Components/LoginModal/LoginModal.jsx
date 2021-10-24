import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
import { signInWithEmailAndPassword } from 'Services/firebase';
import styles from 'Components/LoginModal/LoginModal.module.scss';
import { useState } from 'react';

const LoginModal = ({ toggleRegister, toggleResetPassword }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const {
    modalContent,
    modalForm,
    loginGoogleAuth,
    submitButton,
    paragraph,
    googleAuthText,
  } = styles;
  return (
    <>
      <div className={modalContent}>
        <form
          className={modalForm}
          onSubmit={() =>
            signInWithEmailAndPassword(credentials.email, credentials.password)
          }
        >
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button type="submit" label="Login" className={submitButton} />
        </form>
        <div className={loginGoogleAuth} onClick={console.log('googlelogin')}>
          <img src="assets/google-icon.svg" alt="google icon" />
          <div className={googleAuthText}>Login with Google</div>
        </div>
        <p className={paragraph} onClick={toggleRegister}>
          Forgot your password?"
        </p>

        <p className={paragraph} onClick={toggleResetPassword}>
          New user ? Create an account
        </p>
      </div>
    </>
  );
};

export default LoginModal;
