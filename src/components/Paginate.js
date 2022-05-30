import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { range } from "../utils/range";

const Paginate = ({ page, maxPage, search, count }) => {
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  let isFirstPage = currentPage === 1 ? true : false;
  let isLastePage = currentPage === maxPage ? true : false;
  let minIndex = currentPage - count > 1 ? currentPage - count : 1;
  let maxIndex = currentPage + count > maxPage ? maxPage : currentPage + count;
  const itemPage = range(minIndex, maxIndex);

  const navigate = useNavigate();

  const pageHandler = (page) => {
    setCurrentPage(page);
    search
      ? navigate(`/search/${search}/page/${page}`)
      : navigate(`/page/${page}`);
  };

  return (
    <>
      {maxPage > 1 ? (
        <Pagination>
          <Pagination.First
            disabled={isFirstPage}
            onClick={() => pageHandler(1)}
          />
          <Pagination.Prev
            disabled={isFirstPage}
            onClick={() => pageHandler(currentPage - 1)}
          />
          {itemPage.map((page) => (
            <Pagination.Item
              key={page}
              active={Number(page) === Number(currentPage) ? true : false}
              onClick={() => pageHandler(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={isLastePage}
            onClick={() => pageHandler(currentPage + 1)}
          />
          <Pagination.Last
            disabled={isLastePage}
            onClick={() => pageHandler(maxPage)}
          />
        </Pagination>
      ) : null}
    </>
  );
};

export default Paginate;
