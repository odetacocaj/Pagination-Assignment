import "./Pagination.css";
import { useEffect } from "react";
function Pagination({ totalPages, currentPage, setCurrentPage, setPageSize, pageSize }) {
  const pageNumbers = [];
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-buttons-container">
        <button className="toggle-button" onClick={handlePrevClick} disabled={currentPage === 1}>
          &lt;
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${number === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="toggle-button"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <div>
        <select
          className="page-size_select"
          name="page-size"
          defaultValue={pageSize}
          onChange={(e) => {
            setPageSize(e.target.value);
          }}
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
