import React from "react";

function Pagination({ notesPerPage, totalNotes, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          disabled={currentPage === number}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
