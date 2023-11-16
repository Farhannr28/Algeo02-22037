// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <nav className="my-4">
      <ul className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
