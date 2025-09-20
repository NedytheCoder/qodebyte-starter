"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input } from "./Input";
import { RegularButton } from "./Button";
import { AiOutlinePercentage } from "react-icons/ai";

export interface TaxFormData {
  id: string;
  name: string;
  rate: number; // percentage
}

interface AddTaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTax: (tax: TaxFormData) => void;
}

export function AddTaxModal({ isOpen, onClose, onAddTax }: AddTaxModalProps) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState<string>("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Tax name is required");
    const r = Number(rate);
    if (isNaN(r) || r < 0) return setError("Enter a valid rate");
    onAddTax({ id: `${Date.now()}`, name: name.trim(), rate: r });
    setName("");
    setRate("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-[95%] md:w-[45%] mx-4">
        <div className="px-6 py-4 rounded-t-xl bg-gray-700 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <AiOutlinePercentage className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Add Tax</h2>
              <p className="text-xs opacity-90">Define a tax and its rate.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white focus:outline-none">
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input label="Tax Name *" value={name} onChange={(e) => setName(e.target.value)} required error={!!error && !name} />
          <Input label="Rate (%) *" value={rate} onChange={(e) => setRate(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-3">
            <RegularButton label="Cancel" onClick={onClose} className="!bg-gray-100 !text-gray-700 w-full !border !border-gray-200 !py-3" type="button" />
            <RegularButton label="Save Tax" type="submit" className="w-full !py-3" />
          </div>
        </form>
      </div>
    </div>
  );
}
