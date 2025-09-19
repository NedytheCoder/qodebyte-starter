"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input, Textarea } from "./Input";
import { AiFillFolderAdd } from "react-icons/ai";
import { RegularButton } from "./Button";

interface AddCustomVariantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddvariant: (variant: { name: string }) => void;
  variantName: string;
  handleAddVariant: () => void;
  setVariantName: (name: string) => void;
}

export function AddCustomVariant({
  isOpen,
  onClose,
  onAddvariant,
  variantName,
  setVariantName,
  handleAddVariant,
}: AddCustomVariantProps) {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!variantName.trim()) {
      setError("Variant name is required");
      return;
    }
    handleAddVariant();
    setVariantName("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden flex justify-center items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] md:w-[45%] mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <AiFillFolderAdd className="text-gray-600 w-10 h-10" /> Create New
            Variant
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Input
              label="Variant Name"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              error={!!error}
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          {/* Footer */}
          <div className="pt-4 flex w-full gap-2">
            <RegularButton
              label="Cancel"
              onClick={onClose}
              className="!bg-white !text-gray-800 w-full !border !border-gray-300"
            />
            <RegularButton
              label="Add Variant"
              type="submit"
              className="btn w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
