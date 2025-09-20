"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input, Textarea } from "./Input";
import { RegularButton } from "./Button";
import { AiOutlineTag } from "react-icons/ai";

export interface CouponFormData {
  id: string;
  code: string;
  discount?: number; // optional percent or amount (simple)
  description?: string;
}

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCoupon: (coupon: CouponFormData) => void;
}

export function AddCouponModal({ isOpen, onClose, onAddCoupon }: AddCouponModalProps) {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return setError("Coupon code is required");
    const d = discount ? Number(discount) : undefined;
    if (discount && (isNaN(d as number) || (d as number) < 0)) return setError("Discount must be a valid number");

    onAddCoupon({ id: `${Date.now()}`, code: code.trim(), discount: d, description: description.trim() || undefined });

    setCode("");
    setDiscount("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-[95%] md:w-[45%] mx-4">
        <div className="px-6 py-4 rounded-t-xl bg-gradient-to-r from-gray-500 to-gray-700 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <AiOutlineTag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Add Coupon</h2>
              <p className="text-xs opacity-90">Create a coupon code and optional discount.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white focus:outline-none">
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input label="Coupon Code *" value={code} onChange={(e) => setCode(e.target.value)} required error={!!error && !code} />
          <Input label="Discount (%) (optional)" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          <Textarea label="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-3">
            <RegularButton label="Cancel" onClick={onClose} className="!bg-gray-100 !text-gray-700 w-full !border !border-gray-200 !py-3" type="button" />
            <RegularButton label="Save Coupon" type="submit" className="w-full !py-3" />
          </div>
        </form>
      </div>
    </div>
  );
}
