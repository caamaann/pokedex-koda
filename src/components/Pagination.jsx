import PropTypes from "prop-types";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const sideButtons = Math.floor(maxPageButtons / 2);

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - sideButtons);
      const endPage = Math.min(totalPages - 1, currentPage + sideButtons);

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) =>
      typeof number === "number" ? (
        <button
          key={index}
          onClick={() => handleClick(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ) : (
        <span key={index} className="dots">
          {number}
        </span>
      )
    );
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#60;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &#62;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
