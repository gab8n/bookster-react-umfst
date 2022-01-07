import styles from './BookComments.module.scss';
import { useState, useEffect } from 'react';
import Button from 'Components/Common/Button/Button';
import {
  addComment,
  deleteComment,
  getComments,
} from 'Services/firebaseUserActions';
import { toast } from 'react-toastify';
import { RiChatDeleteFill } from 'react-icons/ri';

const BookComments = ({ authStore, bookId }) => {
  const {
    container,
    commentsTitle,
    addCommentContainer,
    textarea,
    profilePic,
    button,
    commentsContainer,
    commentContainer,
    commentUsername,
    userPhotoContainer,
    deleteCommentIcon,
  } = styles;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const handleSendComment = () => {
    if (comment.length > 0) {
      addComment(
        comment,
        bookId,
        authStore.userData.uid,
        authStore.userData.displayName,
        authStore.userData.photoURL
      );
      setComment('');
      toast.success('Succesfull added Comment');
    } else {
      toast.error('Empty comment');
    }
  };
  const handleDeleteComment = (commentObj) => {
    deleteComment(commentObj, bookId);
    toast.success('Succesfull deleted Comment');
  };

  useEffect(() => {
    getComments(bookId, setComments);
  }, []);

  return (
    <div className={container}>
      <h3 className={commentsTitle}>Comments</h3>
      {authStore.loggedIn ? (
        <div className={addCommentContainer}>
          <img
            src={authStore.userData.photoURL}
            alt={'profile'}
            className={profilePic}
          />
          <textarea
            rows="4"
            className={textarea}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Please share your experience about this book"
          ></textarea>
          <Button
            label="Add Comment"
            className={button}
            onClick={() => handleSendComment()}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={commentsContainer}>
        {comments?.map((element) => (
          <div className={commentContainer}>
            <div className={userPhotoContainer}>
              <img
                src={element.photoURL}
                alt={'profile'}
                className={profilePic}
              />
              <h4 className={commentUsername}>
                {element.displayName}{' '}
                {element.userId === authStore.userData.uid ? (
                  <RiChatDeleteFill
                    className={deleteCommentIcon}
                    onClick={() => handleDeleteComment(element)}
                  />
                ) : (
                  <></>
                )}
              </h4>
            </div>
            <p>{element.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookComments;
