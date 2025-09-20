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
    <div className="overflow-hidden shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
          <thead className="bg-gray-50">
            <tr className="hidden sm:table-row">
              <th className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">
                Base SKU
              </th>
              <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                Product Name
              </th>
              <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                Category
              </th>
              <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                Brand
              </th>
              <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                Threshold
              </th>
              <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                Has Variation
              </th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              {
                id: 1,
                baseSKU: "123456",
                productName: "Product 1",
                category: "Category 1",
                brand: "Brand 1",
                threshold: 10,
                hasVariation: true,
                status: "success",
                statusText: "Successful",
              },
              {
                id: 2,
                baseSKU: "123456",
                productName: "Product 2",
                category: "Category 2",
                brand: "Brand 2",
                threshold: 20,
                hasVariation: false,
                status: "success",
                statusText: "Successful",
              },
              {
                id: 3,
                baseSKU: "123456",
                productName: "Product 3",
                category: "Category 3",
                brand: "Brand 3",
                threshold: 30,
                hasVariation: true,
                status: "failed",
                statusText: "Failed - Wrong Password",
              },
            ].map((item) => {
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  {/* Date & Time */}
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6">
                    <div className="sm:hidden mb-1 font-semibold">Base SKU</div>
                    <div className="flex flex-col">
                      <span>{item.baseSKU}</span>
                      <span className="text-xs text-gray-500">
                        {item.productName}
                      </span>
                    </div>
                  </td>

                  {/* Device */}
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                    <div className="sm:hidden mb-1 font-semibold">
                      Product Name
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center"></div>
                      <div className="ml-3">{item.productName}</div>
                    </div>
                  </td>

                  {/* IP Address */}
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                    <div className="sm:hidden mb-1 font-semibold">Category</div>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">
                      {item.category}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                    <div className="sm:hidden mb-1 font-semibold">Brand</div>
                    <div className="flex items-center">{item.brand}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                    <div className="sm:hidden mb-1 font-semibold">
                      Threshold
                    </div>
                    <div className="flex items-center">{item.threshold}</div>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="sm:hidden mb-1 font-semibold">
                      Has Variation
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-500`}
                    >
                      {item.hasVariation ? "Yes" : "No"}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
                    <div className="sm:hidden mb-2 font-semibold">Actions</div>
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => {
                        // View details action
                        console.log("View details for:", item.id);
                      }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        // Report suspicious activity action
                        console.log("Report suspicious activity:", item.id);
                      }}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StockTableProps<T extends Record<string, unknown>> {
  columns: ReadonlyArray<{ key: keyof T; label: string }>;
  rows: T[];
  onEdit?: (item: T) => void;
  onReport?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  onRestock?: (item: T) => void;
  className?: string;
}

export function StockTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onEdit,
  onReport,
  onView,
  onDelete,
  onRestock,
  className,
}: StockTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No items found</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden shadow rounded-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="py-3.5 px-3 text-left font-semibold text-gray-900"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || onView || onReport) && (
                <th className="px-3">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white text-gray-500">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => {
                  const raw = row[col.key as keyof T];
                  const text = String(raw ?? "");
                  const normalized = text.toString().trim().toLowerCase();
                  // extended status coloring
                  const colorClass =
                    raw === "IN" ||
                    normalized === "high" ||
                    normalized === "full"
                      ? "text-green-500"
                      : raw === "OUT" ||
                        normalized === "low" ||
                        normalized === "out of stock"
                      ? "text-red-500"
                      : raw === "DAMAGED"
                      ? "text-yellow-500"
                      : "";

                  return (
                    <td
                      key={String(col.key)}
                      className={`whitespace-nowrap px-3 py-4 `}
                    >
                      <p className={`${colorClass}`}>{text}</p>
                    </td>
                  );
                })}

                {(onEdit || onDelete || onView || onReport || onRestock) && (
                  <td className="whitespace-nowrap px-3 py-4 text-right">
                    {onEdit && (
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {onView && (
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => onView(row)}
                      >
                        View
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </button>
                    )}
                    {onReport && (
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => onReport(row)}
                      >
                        Report
                      </button>
                    )}
                    {onRestock && (
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => onRestock(row)}
                      >
                        Restock
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
