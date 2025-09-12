"use client";

import { useState, useMemo } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
  rowKey?: keyof T;
}

export function Table<T extends object>({
  data,
  columns,
  pageSize = 10,
  className = "",
  onRowClick,
  rowKey,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const totalPages = Math.ceil(data.length / pageSize);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === bValue) return 0;
      const comparison = aValue > bValue ? 1 : -1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, sortedData]);

  const requestSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (rowKey) return String(row[rowKey]);
    return `row-${index}`;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                  column.sortable
                    ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    : ""
                }`}
                onClick={() =>
                  column.sortable && typeof column.accessor === "string"
                    ? requestSort(column.accessor as keyof T)
                    : null
                }
                style={{ width: column.width }}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && sortConfig.key === column.accessor && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={`${
                  onRowClick
                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    : ""
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : String(row[column.accessor as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, data.length)}
            </span>{" "}
            of <span className="font-medium">{data.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
