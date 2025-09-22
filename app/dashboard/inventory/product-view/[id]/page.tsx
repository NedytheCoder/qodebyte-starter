"use client";

import { RegularButton } from "@/app/components/Button";
import React, { useState } from "react";
import {
  FaPlus,
  FaArrowLeft,
  FaArrowUp,
  FaCheck,
  FaAngleDown,
  FaSliders,
} from "react-icons/fa6";
import Link from "next/link";
import { TbCurrencyNaira } from "react-icons/tb";
import { Pane } from "@/app/components/Tabpane";
import { StockTable } from "@/app/components/Table";
import { SelectDropdown } from "@/app/components/Input";
import { BarChart } from "@/app/components/charts";

const Page = () => {
  const num = [
    {
      icon: <TbCurrencyNaira />,
      label: "Inventory Value",
      value: "₦1,000",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Potential Sales value",
      value: "₦14,000.00",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Total in Stock",
      value: "₦3,200.00",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Threshold level",
      value: "₦3,200.00",
      percent: 0,
      direction: <FaArrowUp />,
    },
  ];
  const [showEditModal, setShowEditModal] = useState(false);
  type DetailTab =
    | "description"
    | "quantity"
    | "movement"
    | "supplier"
    | "variants"
    | "graph";
  const DETAIL_TABS: { key: DetailTab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "quantity", label: "Quantity" },
    { key: "movement", label: "Movement History" },
    { key: "supplier", label: "Supplier Details" },
    { key: "variants", label: "Variants" },
    { key: "graph", label: "Graph" },
  ];
  const [activeDetail, setActiveDetail] = useState<DetailTab>("description");
  // Dropdown state and options
  const [duration, setDuration] = useState("7d");
  const [variant, setVariant] = useState("all");

  const durationOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
  ];

  const variantOptions = [
    { value: "all", label: "All variants" },
    { value: "v1", label: "Variant 1" },
    { value: "v2", label: "Variant 2" },
  ];
  // Demo chart data (replace with real data as needed)
  const chartData = [
    { name: "Jan", value: 4 },
    { name: "Feb", value: 7 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 6 },
    { name: "May", value: 5 },
  ];
  return (
    <main className="flex-1 w-full md:ml-64 text-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <Link
          href="/dashboard/inventory"
          className="flex items-center gap-2 text-gray-700"
        >
          <FaArrowLeft />
          <p>Back to Inventory</p>
        </Link>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between my-2 gap-3 md:mt-2 -mb-2">
          <div>
            <h1 className="md:text-xl text-lg font-semibold text-gray-900 -mb-2 md:mb-0">
              Inventory
            </h1>
          </div>
          <div className={`w-full md:flex md:justify-end md:mb-2`}>
            <RegularButton
              onClick={() => setShowEditModal(true)}
              label={
                <p className="text-sm flex items-center">
                  <FaPlus /> Add Product
                </p>
              }
              className="text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-7 mt-3">
          {num.map((n) => (
            <div
              className="bg-white rounded-xl shadow-sm p-3 sm:p-6 text-gray-800 flex flex-col gap-5"
              key={n.label}
            >
              <div>
                <div className="border rounded-md p-2 w-fit">{n.icon}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs md:text-sm text-gray-600">{n.label}</p>
                <p className="text-sm md:text-md font-semibold">{n.value}</p>
              </div>
              <div className="flex items-center gap-1 border w-fit p-1 rounded-md text-green-400">
                <p className="text-sm">{n.direction}</p>
                <p className="text-sm">{n.percent}</p>
              </div>
            </div>
          ))}
        </div>
        {/* HERE: Product images and details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6 items-start">
          {/* Thumbnails */}
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-3 lg:block lg:space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-20 lg:h-28 w-full rounded-md border bg-white overflow-hidden flex items-center justify-center ${
                  i === 1 ? "ring-2 ring-green-500" : ""
                }`}
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1200&auto=format&fit=crop')",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div className="order-1 lg:order-2 bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="rounded-lg border bg-gray-50 h-[280px] md:h-[360px] flex items-center justify-center overflow-hidden">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1600&auto=format&fit=crop')",
                }}
              />
            </div>
          </div>
        </div>

        {/* Product title, sku and price */}
        <div className="mt-6">
          <h2 className="font-semibold text-gray-900">dtgdfg</h2>
          <p className="text-sm text-gray-500">DTGDFG-GEF</p>

          <div className="mt-4">
            <p className="text-xs text-gray-500">Price Tag</p>
            <p className="text-2xl font-semibold flex items-center gap-1">
              <TbCurrencyNaira /> 30,000.00
            </p>
          </div>
        </div>

        {/* Detail Tabs */}
        <div className="mt-4">
          <div className="w-full md:w-fit rounded-lg bg-white p-1">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-2">
                <Pane
                  tabs={DETAIL_TABS}
                  setActiveSection={(section: DetailTab) =>
                    setActiveDetail(section)
                  }
                  activeSection={activeDetail}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab contents */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 my-4">
          {activeDetail === "description" && (
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm mt-1 text-gray-700">
                  fdfdfdfdfdfdfdfdfdfdfdfdfd
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Variant 1 - 'ff'
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Product
                    </p>
                    <p className="text-sm text-gray-800">dtgdfg</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Barcode
                    </p>
                    <p className="text-sm text-gray-800 break-all">
                      DTGDFG-GEF-ff-1758529116736-0
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Category
                    </p>
                    <p className="text-sm text-gray-800">5</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Unit Of Measurement
                    </p>
                    <p className="text-sm text-gray-800">Kilograms(KG)</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Current Quantity
                    </p>
                    <p className="text-sm text-gray-800">4 KG</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Reorder Threshold
                    </p>
                    <p className="text-sm text-gray-800">10 KG</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Suggested Reorder Qty
                    </p>
                    <p className="text-sm text-gray-800">10 KG</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Status
                    </p>
                    <p className="text-sm text-gray-800">Low Stock</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500">
                      Date Added
                    </p>
                    <p className="text-sm text-gray-800">22 septembre 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2">
                <button className="px-4 py-2 rounded-md border bg-gray-50 text-gray-700">
                  Delete Product
                </button>
                <button className="px-4 py-2 rounded-md border text-green-600 border-green-500 bg-white">
                  Adjust
                </button>
                <button className="px-4 py-2 rounded-md bg-green-600 text-white">
                  Re Order
                </button>
              </div>
            </div>
          )}

          {activeDetail === "quantity" && (
            <div className="text-sm text-gray-700 space-y-4">
              {/* Restocked header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p>
                    Amount Restocked: <span className="font-medium">7 QTY</span>
                  </p>
                </div>
                <p className="text-green-600">0.07/100</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "7%" }} />
              </div>

              {/* Stock level */}
              <div className="flex items-center gap-2 text-gray-700">
                <p>
                  Stock Level: <span className="text-green-600">Normal</span>
                </p>
                <FaCheck className="text-green-600" size={14} />
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2">
                <button className="px-4 py-2 rounded-md border bg-gray-50 text-gray-700">
                  Delete Product
                </button>
                <button className="px-4 py-2 rounded-md border text-green-600 border-green-500 bg-white">
                  Adjust
                </button>
                <button className="px-4 py-2 rounded-md bg-green-600 text-white">
                  Re Order
                </button>
              </div>
            </div>
          )}
          {activeDetail === "movement" && (
            <div className="text-sm text-gray-700">
              <StockTable
                rows={[
                  {
                    item: "Item 1",
                    date: "2022-01-01",
                    type: "In",
                    quantity: 10,
                    addedBy: "John Doe",
                    status: "INCREASE",
                  },
                ]}
                columns={[
                  { key: "item", label: "Item" },
                  { key: "date", label: "Date" },
                  { key: "type", label: "Type" },
                  { key: "quantity", label: "Quantity" },
                  { key: "addedBy", label: "Added By" },
                  { key: "status", label: "Status" },
                ]}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
          {activeDetail === "supplier" && (
            <div className="text-sm text-gray-700 space-y-5">
              <div>
                <button
                  //   onClick={() => setAddSupplierModal(true)}
                  className="text-green-600 font-medium"
                >
                  Add New Supplier
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">Supplier - #1</p>
                <p className="text-gray-500">Contact Information</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700">Supplier Name</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Phone Number</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Email</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Address</p>
                  </div>
                </div>
                <div className="space-y-4 text-right">
                  <div>
                    <p className="text-gray-800">De Intellectro</p>
                  </div>
                  <div>
                    <p className="text-gray-800">+5657454895</p>
                  </div>
                  <div>
                    <p className="text-gray-500">N/A</p>
                  </div>
                  <div>
                    <p className="text-gray-500">N/A</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2">
                <button className="px-4 py-2 rounded-md border bg-gray-50 text-gray-700">
                  Delete Product
                </button>
                <button className="px-4 py-2 rounded-md border text-green-600 border-green-500 bg-white">
                  Adjust
                </button>
                <button className="px-4 py-2 rounded-md bg-green-600 text-white">
                  Re Order
                </button>
              </div>
            </div>
          )}
          {activeDetail === "variants" && (
            <div className="text-sm text-gray-700">
              <StockTable
                rows={[
                  {
                    SKU: "ddDSD-FDS",
                    attributes: "large",
                    quantity: 10,
                    threshold: 1,
                    costPrice: 1000,
                    sellingPrice: 1000,
                    status: "LOW STOCK",
                  },
                ]}
                columns={[
                  {
                    key: "SKU",
                    label: "SKU",
                  },
                  {
                    key: "attributes",
                    label: "Attributes",
                  },
                  {
                    key: "quantity",
                    label: "Quantity",
                  },
                  {
                    key: "threshold",
                    label: "Threshold",
                  },
                  {
                    key: "costPrice",
                    label: "Cost Price",
                  },
                  {
                    key: "sellingPrice",
                    label: "Selling Price",
                  },
                  {
                    key: "status",
                    label: "Status",
                  },
                ]}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
          {activeDetail === "graph" && (
            <div className="rounded-xl bg-white">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Product Variant Flow
                  </h3>
                  <p className="text-xs text-gray-500">
                    Monitor the flow of your inventory in and out of your store
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-44">
                    <SelectDropdown
                      options={durationOptions}
                      value={duration}
                      onChange={setDuration}
                      aria-label="Select duration"
                    />
                  </div>
                  <div className="w-44">
                    <SelectDropdown
                      options={variantOptions}
                      value={variant}
                      onChange={setVariant}
                      aria-label="Select variant"
                    />
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="relative w-full rounded-lg border bg-white overflow-hidden">
                <BarChart
                  data={chartData}
                  dataKey="value"
                  height={288}
                  fillColor="#10B981"
                  strokeColor="#10B981"
                  showLegend={false}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
