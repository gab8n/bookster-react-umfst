import React from 'react';
import emailjs from 'emailjs-com';

import styles from './ContactForm.module.scss';
import Input from 'Components/Common/Input/Input';
import Button from 'Components/Common/Button/Button';
const ContactForm = () => {
  const {
    inputEmailContact,
    textareaEmailContact,
    emailContactContainer,
    emailContactForm,
    messageTextareaContainer,
    emailInputContainer,
    emailContactTitle,
    titleContainer,
    submitButton,
  } = styles;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_g4hu6hn',
        'template_qw3cbs9',
        e.target,
        'user_zuY72pXrh06J5LKoNKuvC'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className={emailContactContainer}>
      <div className={titleContainer}>
        <h2 className={emailContactTitle}>We'd love to hear from you.</h2>
      </div>
      <form onSubmit={sendEmail} className={emailContactForm}>
        <div className={emailInputContainer}>
          <Input
            placeholder={'Name'}
            name="name"
            className={inputEmailContact}
          />
          <Input
            placeholder={'Email'}
            name="email"
            className={inputEmailContact}
          />
          <Input
            placeholder={'Organization'}
            name="organization"
            className={inputEmailContact}
          />
        </div>
        <div className={messageTextareaContainer}>
          <textarea
            placeholder={'Message'}
            name="message"
            className={textareaEmailContact}
            rows="4"
          />
          <Button label={'Submit'} className={submitButton} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
