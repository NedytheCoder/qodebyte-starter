"use client";

import { useState, useRef } from "react";
import { FiX, FiUpload, FiDownload, FiFileText } from "react-icons/fi";
import { Input, Textarea, SelectDropdown, Switch } from "./Input";
import { RegularButton, SecondaryButton } from "./Button";
import { toast } from "react-toastify";

interface Product {
  productName: string;
  brand: string;
  category: string;
  unit: string;
  baseSKU: string;
  threshold: number;
  taxable: boolean;
  hasVariation: boolean;
  description: string;
  mainImage?: File;
  additionalImages?: File[];
}

interface BulkProductAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (products: Product[]) => void;
}

export function BulkProductAdd({
  isOpen,
  onClose,
  onAddProducts,
}: BulkProductAddProps) {
  const [importMethod, setImportMethod] = useState<"manual" | "csv">("manual");
  const [products, setProducts] = useState<Product[]>([
    {
      productName: "",
      brand: "",
      category: "",
      unit: "",
      baseSKU: "",
      threshold: 0,
      taxable: false,
      hasVariation: false,
      description: "",
    },
  ]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
    { value: "home", label: "Home & Garden" },
  ];

  const units = [
    { value: "pcs", label: "Pieces" },
    { value: "kg", label: "Kilograms" },
    { value: "lbs", label: "Pounds" },
    { value: "liters", label: "Liters" },
    { value: "meters", label: "Meters" },
  ];

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        brand: "",
        category: "",
        unit: "",
        baseSKU: "",
        threshold: 0,
        taxable: false,
        hasVariation: false,
        description: "",
      },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: unknown
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      parseCsvFile(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const parseCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());

      const parsedProducts: Product[] = lines
        .slice(1)
        .map((line) => {
          const values = line.split(",").map((v) => v.trim());
          return {
            productName: values[0] || "",
            brand: values[1] || "",
            category: values[2] || "",
            unit: values[3] || "",
            baseSKU: values[4] || "",
            threshold: parseInt(values[5]) || 0,
            taxable: values[6]?.toLowerCase() === "true",
            hasVariation: values[7]?.toLowerCase() === "true",
            description: values[8] || "",
          };
        })
        .filter((p) => p.productName); // Remove empty rows

      setProducts(parsedProducts);
      toast.success(`Successfully imported ${parsedProducts.length} products`);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const headers = [
      "Product Name",
      "Brand",
      "Category",
      "Unit",
      "Base SKU",
      "Threshold",
      "Taxable",
      "Has Variation",
      "Description",
    ];

    const csvContent = [
      headers.join(","),
      "Sample Product,Apple,Electronics,pcs,APP-001,10,true,false,Sample product description",
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_product_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validateProducts = (): boolean => {
    const newErrors: Record<string, string> = {};

    products.forEach((product, index) => {
      if (!product.productName.trim()) {
        newErrors[`productName_${index}`] = "Product name is required";
      }
      if (!product.brand.trim()) {
        newErrors[`brand_${index}`] = "Brand is required";
      }
      if (!product.category) {
        newErrors[`category_${index}`] = "Category is required";
      }
      if (!product.unit) {
        newErrors[`unit_${index}`] = "Unit is required";
      }
      if (product.threshold < 0) {
        newErrors[`threshold_${index}`] = "Threshold must be a positive number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProducts()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const validProducts = products.filter((p) => p.productName.trim());
    if (validProducts.length === 0) {
      toast.error("Please add at least one product");
      return;
    }

    onAddProducts(validProducts);
    toast.success(`Successfully added ${validProducts.length} products`);
    onClose();
  };

  const handleClose = () => {
    setProducts([
      {
        productName: "",
        brand: "",
        category: "",
        unit: "",
        baseSKU: "",
        threshold: 0,
        taxable: false,
        hasVariation: false,
        description: "",
      },
    ]);
    setCsvFile(null);
    setErrors({});
    setImportMethod("manual");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden flex justify-center items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[95%] md:w-[90%] lg:w-[80%] mx-4 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <FiFileText className="text-gray-600 w-6 h-6" /> Bulk Product Add
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FiX className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Import Method Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              Import Method
            </h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setImportMethod("manual")}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  importMethod === "manual"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Manual Entry
              </button>
              <button
                type="button"
                onClick={() => setImportMethod("csv")}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  importMethod === "csv"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                CSV Upload
              </button>
            </div>
          </div>

          {importMethod === "csv" ? (
            /* CSV Upload Section */
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium">Upload CSV file</p>
                  <p>Drag and drop your CSV file here, or click to browse</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
                <div className="flex gap-2 justify-center">
                  <RegularButton
                    label="Choose File"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm"
                  />
                  <SecondaryButton
                    label="Download Template"
                    onClick={downloadTemplate}
                    className="text-sm"
                  />
                </div>
                {csvFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {csvFile.name}
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {/* Product Forms */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-900">
                Products ({products.length})
              </h3>
              <RegularButton
                type="button"
                label="Add Product"
                onClick={handleAddProduct}
                className="text-sm"
              />
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Product {index + 1}
                    </h4>
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div>
                      <Input
                        label="Product Name *"
                        value={product.productName}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "productName",
                            e.target.value
                          )
                        }
                        error={!!errors[`productName_${index}`]}
                        placeholder="Enter product name"
                      />
                      {errors[`productName_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`productName_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Brand */}
                    <div>
                      <Input
                        label="Brand *"
                        value={product.brand}
                        onChange={(e) =>
                          handleProductChange(index, "brand", e.target.value)
                        }
                        error={!!errors[`brand_${index}`]}
                        placeholder="Enter brand name"
                      />
                      {errors[`brand_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`brand_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <SelectDropdown
                        label="Category *"
                        options={categories}
                        value={product.category}
                        onChange={(value) =>
                          handleProductChange(index, "category", value)
                        }
                        placeholder="Select category"
                        error={!!errors[`category_${index}`]}
                      />
                      {errors[`category_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`category_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Unit */}
                    <div>
                      <SelectDropdown
                        label="Unit *"
                        options={units}
                        value={product.unit}
                        onChange={(value) =>
                          handleProductChange(index, "unit", value)
                        }
                        placeholder="Select unit"
                        error={!!errors[`unit_${index}`]}
                      />
                      {errors[`unit_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`unit_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Base SKU */}
                    <div>
                      <Input
                        label="Base SKU"
                        value={product.baseSKU}
                        onChange={(e) =>
                          handleProductChange(index, "baseSKU", e.target.value)
                        }
                        placeholder="Enter SKU (optional)"
                      />
                    </div>

                    {/* Threshold */}
                    <div>
                      <Input
                        label="Threshold *"
                        type="number"
                        value={product.threshold}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "threshold",
                            parseInt(e.target.value) || 0
                          )
                        }
                        error={!!errors[`threshold_${index}`]}
                        placeholder="Enter threshold"
                      />
                      {errors[`threshold_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`threshold_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Taxable */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Taxable</label>
                      <Switch
                        checked={product.taxable}
                        onChange={() =>
                          handleProductChange(
                            index,
                            "taxable",
                            !product.taxable
                          )
                        }
                      />
                    </div>

                    {/* Has Variation */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">
                        Has Variation
                      </label>
                      <Switch
                        checked={product.hasVariation}
                        onChange={() =>
                          handleProductChange(
                            index,
                            "hasVariation",
                            !product.hasVariation
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <Textarea
                      label="Description"
                      value={product.description}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Enter product description (optional)"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 flex w-full gap-3 border-t border-gray-200">
              <SecondaryButton
                label="Cancel"
                onClick={handleClose}
                className="w-full"
              />
              <RegularButton
                label={`Add ${
                  products.filter((p) => p.productName.trim()).length
                } Products`}
                type="submit"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
