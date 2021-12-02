import Button from 'Components/Common/Button/Button';
import Input from 'Components/Common/Input/Input';
import styles from './AccountSettings.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { updateUserData } from 'Services/firebaseAuth';

const AccountSettings = ({ userAccountData }) => {
  const [userData, setUserData] = useState({
    displayName: '',
    familyName: '',
    givenName: '',
    email: '',
    phone: '',
    biography: '',
  });

  useEffect(() => {
    setUserData({
      displayName: userAccountData?.displayName,
      familyName: userAccountData?.familyName,
      givenName: userAccountData?.givenName,
      email: userAccountData?.email,
      phone: userAccountData?.phone,
      biography: userAccountData?.biography,
    });
  }, [userAccountData]);

  const handleSubmit = () => {
    updateUserData(userData);
  };

  const {
    conatiner,
    title,
    lineContainer,
    input,
    inputLabel,
    inputContainer,
    textarea,
    textareaConatiner,
  } = styles;
  return (
    <div className={conatiner}>
      <div className={lineContainer}>
        <h2 className={title}>Profile Settings</h2>
      </div>
      <div className={lineContainer}>
        <div className={inputContainer}>
          <label className={inputLabel}>Username</label>
          <Input
            value={userData.displayName}
            onChange={(e) =>
              setUserData({ ...userData, displayName: e.target.value })
            }
            className={input}
          />
        </div>
      </div>
      <div className={lineContainer}>
        <div className={inputContainer}>
          <label className={inputLabel}>First Name</label>
          <Input
            value={userData.givenName}
            onChange={(e) =>
              setUserData({ ...userData, givenName: e.target.value })
            }
            className={input}
          />
        </div>
        <div className={inputContainer}>
          <label className={inputLabel}>Last Name</label>
          <Input
            value={userData.familyName}
            onChange={(e) =>
              setUserData({ ...userData, familyName: e.target.value })
            }
            className={input}
          />
        </div>
      </div>
      <div className={lineContainer}>
        <div className={inputContainer}>
          <label className={inputLabel}>Email</label>
          <Input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className={input}
          />
        </div>
        <div className={inputContainer}>
          <label className={inputLabel}>Phone</label>
          <Input
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            className={input}
          />
        </div>
      </div>
      <div className={lineContainer}>
        <div className={`${inputContainer} ${textareaConatiner}`}>
          <label className={inputLabel}>Bio</label>
          <textarea
            value={userData.biography}
            onChange={(e) =>
              setUserData({ ...userData, biography: e.target.value })
            }
            rows="5"
            className={textarea}
          />
        </div>
      </div>
      <div className={lineContainer}>
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AccountSettings;
