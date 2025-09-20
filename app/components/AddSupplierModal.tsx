"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input, Textarea } from "./Input";
import { RegularButton } from "./Button";
import { AiOutlineUserAdd } from "react-icons/ai";

export interface SupplierFormData {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: SupplierFormData) => void;
}

export function AddSupplierModal({ isOpen, onClose, onAddSupplier }: AddSupplierModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Supplier name is required");
      return;
    }
    const supplier: SupplierFormData = {
      id: `${Date.now()}`,
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    };
    onAddSupplier(supplier);

    // reset
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setNotes("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-[95%] md:w-[50%] mx-4">
        {/* Header */}
        <div className="px-6 py-4 rounded-t-xl bg-gray-700 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <AiOutlineUserAdd className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Add New Supplier</h2>
              <p className="text-xs opacity-90">Create and save a supplier to use in orders.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white focus:outline-none">
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Supplier Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={!!error && !name}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

          <Textarea label="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="pt-2 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-3">
            <RegularButton
              label="Cancel"
              onClick={onClose}
              className="!bg-gray-100 !text-gray-700 w-full !border !border-gray-200 !py-3"
              type="button"
            />
            <RegularButton label="Save Supplier" type="submit" className="w-full !py-3" />
          </div>
        </form>
      </div>
    </div>
  );
}
