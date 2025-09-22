"use client";

import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { SelectDropdown } from "./Input";
import { RegularButton } from "./Button";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface OrderItem {
  product: string;
  variant?: string;
  quantity: number;
}

export interface OrderFormData {
  supplier: string;
  orderDate: string; // ISO date string
  expectedDate: string; // ISO date string
  items: OrderItem[];
}

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (order: OrderFormData) => void;
}

export function AddOrderModal({
  isOpen,
  onClose,
  onAddOrder,
}: AddOrderModalProps) {
  const [supplier, setSupplier] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [expectedDate, setExpectedDate] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [items, setItems] = useState<OrderItem[]>([]);

  const [error, setError] = useState<string>("");

  // Variant dimensions per product: { [product]: { [dimensionName]: string[] } }
  const productVariantMatrix: Record<string, Record<string, string[]>> = {
    // Examples; replace with real data source as needed
    gas_cylinder: {
      Color: ["Red", "Blue"],
      Size: ["Medium", "Large"],
    },
    water_bottle: {
      Size: ["Small"],
      Material: ["Cotton"],
    },
    match_box: {
      Color: ["Blue"],
      Size: ["Large"],
    },
  };

  // Generate cartesian combinations for a product's variant dimensions
  const generateVariantCombinations = (
    dims: Record<string, string[]>
  ): Array<Record<string, string>> => {
    const keys = Object.keys(dims);
    if (keys.length === 0) return [];
    let combos: Array<Record<string, string>> = [{}];
    for (const k of keys) {
      const next: Array<Record<string, string>> = [];
      for (const combo of combos) {
        for (const val of dims[k]) {
          next.push({ ...combo, [k]: val });
        }
      }
      combos = next;
    }
    return combos;
  };

  // Options for the variant dropdown for the selected product
  const variantOptions = useMemo(() => {
    const dims = productVariantMatrix[selectedProduct];
    if (!dims || Object.keys(dims).length === 0) return [];
    const combos = generateVariantCombinations(dims);
    return [
      { value: "", label: "Select Variant" },
      ...combos.map((obj) => {
        const label = Object.keys(obj)
          .sort()
          .map((k) => `${k}: ${obj[k]}`)
          .join(" / ");
        return { value: label, label };
      }),
    ];
  }, [selectedProduct]);

  const canAddItem = useMemo(() => {
    const hasVariantOptions = variantOptions.length > 1; // includes placeholder
    const variantOk = !hasVariantOptions || !!selectedVariant;
    return !!selectedProduct && qty > 0 && variantOk;
  }, [selectedProduct, selectedVariant, qty, variantOptions]);

  const handleAddItem = () => {
    if (!canAddItem) return;
    setItems((prev) => {
      // merge quantities if product already exists
      const idx = prev.findIndex(
        (i) => i.product === selectedProduct && i.variant === selectedVariant
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [
        ...prev,
        { product: selectedProduct, variant: selectedVariant || undefined, quantity: qty },
      ];
    });
    setSelectedProduct("");
    setSelectedVariant("");
    setQty(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier) return setError("Supplier is required");
    if (!orderDate) return setError("Order date is required");
    if (!expectedDate) return setError("Expected delivery date is required");
    if (items.length === 0) return setError("Add at least one product item");

    onAddOrder({ supplier, orderDate, expectedDate, items });

    // reset and close
    setSupplier("");
    setOrderDate("");
    setExpectedDate("");
    setSelectedProduct("");
    setQty(1);
    setItems([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center text-gray-700">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-[95%] md:w-[60%] mx-4">
        {/* Header - gradient */}
        <div className="px-6 py-4 rounded-t-xl bg-gray-700 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <AiOutlineShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Create New Order</h2>
              <p className="text-xs opacity-90">
                Initiate a new order by selecting items, specifying quantities,
                and assigning supplier details.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white focus:outline-none"
          >
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Top row: Supplier, Order Date, Expected Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <SelectDropdown
                  label={
                    <span className="text-xs text-gray-700">Supplier *</span>
                  }
                  options={[
                    { value: "", label: "Select Supplier" },
                    { value: "supplier_1", label: "North Wind Traders" },
                    { value: "supplier_2", label: "Contoso Ltd" },
                  ]}
                  value={supplier}
                  onChange={(value) => setSupplier(value)}
                  placeholder="Select Supplier"
                />
              </div>
              <button
                type="button"
                className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-500 text-white grid place-items-center hover:bg-gray-600"
                title="Add new supplier"
                onClick={() => alert("Add Supplier flow")}
              >
                +
              </button>
            </div>

            <div>
              <label className="block text-xs text-gray-700 mb-1">
                Order Date *
              </label>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="block w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-700 mb-1">
                Expected Delivery Date *
              </label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="block w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                required
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Products section */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">Products</p>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_2fr] gap-3 items-end">
              {/* Product Select */}
              <div>
                <SelectDropdown
                  label={<span className="text-xs text-gray-700">Product</span>}
                  options={[
                    { value: "", label: "Select Product" },
                    { value: "gas_cylinder", label: "Gas Cylinder" },
                    { value: "water_bottle", label: "Water Bottle" },
                    { value: "match_box", label: "Match Box" },
                  ]}
                  value={selectedProduct}
                  onChange={(value) => {
                    setSelectedProduct(value);
                    setSelectedVariant("");
                  }}
                  placeholder="Select Product"
                />
              </div>

              {/* Variant Select (appears when a product is selected and has variant combinations) */}
              <div>
                {selectedProduct && variantOptions.length > 1 && (
                  <SelectDropdown
                    label={<span className="text-xs text-gray-700">Variant</span>}
                    options={variantOptions}
                    value={selectedVariant}
                    onChange={(value) => setSelectedVariant(value)}
                    placeholder="Select Variant"
                  />
                )}
              </div>

              {/* Quantity stepper */}
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                  <button
                    type="button"
                    className="w-10 h-full text-gray-700 hover:bg-gray-100"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    –
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) =>
                      setQty(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full text-center text-sm outline-none"
                  />
                  <button
                    type="button"
                    className="w-10 h-full text-gray-700 hover:bg-gray-100"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add item button */}
              <div>
                <RegularButton
                  type="button"
                  onClick={handleAddItem}
                  className={`w-full ${
                    canAddItem ? "" : "!cursor-not-allowed opacity-60"
                  }`}
                  label={
                    <p className="flex items-center justify-center gap-2">
                      + Add Item
                    </p>
                  }
                />
              </div>
            </div>

            {/* Items list */}
            {items.length > 0 && (
              <div className="border border-gray-200 rounded-md divide-y">
                {items.map((it, idx) => (
                  <div
                    key={`${it.product}-${idx}`}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium capitalize">
                        {it.product.replace(/_/g, " ")}
                      </span>
                      {it.variant && (
                        <span className="text-gray-500">Variant: {it.variant}</span>
                      )}
                      <span className="text-gray-500">Qty: {it.quantity}</span>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-xs"
                      onClick={() =>
                        setItems((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Footer */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-3">
            <RegularButton
              label="Cancel"
              onClick={onClose}
              className="!bg-gray-100 !text-gray-700 w-full !border !border-gray-200 !py-3"
              type="button"
            />
            <RegularButton
              label={
                <p className="flex items-center justify-center gap-2">
                  <AiOutlineShoppingCart className="w-5 h-5" /> Save Order
                </p>
              }
              type="submit"
              className="w-full !py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
