"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input, Textarea } from "./Input";
import { AiFillFolderAdd } from "react-icons/ai";
import { RegularButton } from "./Button";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: { name: string; description: string }) => void;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onAddCategory,
}: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    if (description.trim().length < 10) {
      setError("Description must be at least 10 characters");
      return;
    }
    onAddCategory({
      name: categoryName.trim(),
      description: description.trim(),
    });
    setCategoryName("");
    setDescription("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] md:w-[45%] mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <AiFillFolderAdd className="text-gray-600 w-10 h-10" /> Create New
            Category
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
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              error={!!error}
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div>
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              minLength={10}
              required
              className="text-black p-1"
            />
            <p className="text-xs text-gray-600 -mt-3">
              Enter a brief description. Minimum 10 characters required
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 flex w-full gap-2">
            <RegularButton
              label="Cancel"
              onClick={onClose}
              className="!bg-white !text-gray-800 w-full !border !border-gray-300"
            />
            <RegularButton
              label="Add Category"
              type="submit"
              className="btn w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
