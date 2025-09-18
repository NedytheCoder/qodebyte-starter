"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
  label?: React.ReactNode;
}

export function Pagination({
  label,
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate the range of page numbers to show
  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

  // Common button styles
  const baseButtonClasses =
    "px-3 py-1.5 text-sm rounded-md transition-colors duration-200";
  const ghostButtonClasses =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
  const primaryButtonClasses =
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600";
  const disabledButtonClasses =
    "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600";

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {label ? (
          label
        ) : (
          <>
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          className={`${baseButtonClasses} ${ghostButtonClasses} ${
            currentPage === 1 ? disabledButtonClasses : ""
          }`}
        >
          ««
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`${baseButtonClasses} ${ghostButtonClasses} ${
            currentPage === 1 ? disabledButtonClasses : ""
          }`}
        >
          «
        </button>

        {/* Page Numbers */}
        {pageNumbers[0] > 1 && (
          <span className="px-3 py-1.5 text-gray-500">...</span>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`${baseButtonClasses} ${
              currentPage === page
                ? primaryButtonClasses
                : `${ghostButtonClasses} hover:bg-opacity-50`
            } min-w-[2.5rem]`}
          >
            {page}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="px-3 py-1.5 text-gray-500">...</span>
        )}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`${baseButtonClasses} ${ghostButtonClasses} ${
            currentPage === totalPages ? disabledButtonClasses : ""
          }`}
        >
          »
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className={`${baseButtonClasses} ${ghostButtonClasses} ${
            currentPage === totalPages ? disabledButtonClasses : ""
          }`}
        >
          »»
        </button>
      </div>
    </div>
  );
}
