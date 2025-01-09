"use client";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  return (
    <div className="flex space-x-2 mt-4 justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-200 rounded-md disabled:bg-blue-50"
      >
        Prev
      </button>
      {[...Array(totalPage).keys()].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page + 1)}
          className={`px-4 py-2 rounded-md ${
            currentPage === page + 1
              ? "bg-gray-50 text-gray-500 "
              : "bg-white divide-y divide-gray-200 border"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="px-4 py-2 bg-blue-200 rounded-md disabled:bg-blue-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
