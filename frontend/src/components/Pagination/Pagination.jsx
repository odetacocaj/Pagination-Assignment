import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ data, onPageChange }) {
  const [page, setPage] = useState(1); 
  const [pageSize, setPageSize] = useState(6);

  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newPaginatedData = data.slice(startIndex, endIndex);
    onPageChange(newPaginatedData);
  }, [data, page, pageSize]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage, newPageSize = pageSize) => {
    const validPage = newPage > 0 && newPage <= totalPages ? newPage : 1;
    setPage(validPage); 
    setPageSize(newPageSize); 
  };

  const handlePrevClick = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    handlePageChange(1, newSize); 
  };

  return (
    <div className="pagination-container">
      <div className="pagination-buttons-container">
        <button className="toggle-button" onClick={handlePrevClick} disabled={page === 1}>
          &lt;
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${number === page ? "active" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button className="toggle-button" onClick={handleNextClick} disabled={page === totalPages}>
          &gt;
        </button>
      </div>

      <div>
        <select className="page-size_select" value={pageSize} onChange={handlePageSizeChange}>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
