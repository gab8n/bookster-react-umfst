import Header from 'Components/Common/Header/Header';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import PaginationBar from './PaginationBar/PaginationBar';

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </div>
  );
}

const Collection = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const startOffset = (pageNumber * itemsPerPage) % items.length;
    const endOffset = startOffset + itemsPerPage;

    setCurrentItems(items.slice(startOffset, endOffset));

    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [pageNumber, itemsPerPage]);

  return (
    <>
      <Header title={'COLLECTION'} navBarOnly={true} />
      <Items currentItems={currentItems} />
      <PaginationBar {...{ pageCount, setPageNumber }} />
    </>
  );
};

export default Collection;
