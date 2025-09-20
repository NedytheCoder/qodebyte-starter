"use client";

import { FiX } from "react-icons/fi";
import { RegularButton } from "./Button";

interface ProductDetailsModalProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  onClose: () => void;
  product: T | null;
  title?: string;
}

export function ProductDetailsModal<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  product,
  title = "Product Details",
}: ProductDetailsModalProps<T>) {
  if (!isOpen || !product) return null;

  const entries = Object.entries(product);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-[95%] md:w-[50%] mx-4">
        <div className="px-6 py-4 rounded-t-xl bg-gray-700 text-white flex items-start justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white/90 hover:text-white focus:outline-none">
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <div className="p-6">
          <div className="divide-y border rounded-md">
            {entries.map(([key, value]) => (
              <div key={key} className="flex items-start justify-between gap-4 px-4 py-3">
                <span className="text-sm text-gray-600 capitalize whitespace-nowrap">
                  {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                </span>
                <span className="text-sm text-gray-900 break-words text-right">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <RegularButton label="Close" onClick={onClose} className="!bg-gray-100 !text-gray-700 !border !border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
