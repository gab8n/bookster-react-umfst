import { useParams } from 'react-router-dom';

const Book = () => {
  let { id } = useParams();
  return <div>{id}</div>;
};

export default Book;
