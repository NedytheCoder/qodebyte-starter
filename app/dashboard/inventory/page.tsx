"use client";

import { RegularButton, SecondaryButton } from "@/app/components/Button";
import {
  Input,
  Searchbar,
  SelectDropdown,
  Switch,
} from "@/app/components/Input";
import { Pagination } from "@/app/components/Pagination";
import { Table } from "@/app/components/Table";
import { PlusIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { FaArrowUp, FaTable } from "react-icons/fa";
import {
  LineChart as AppLineChart,
  PieChart as AppPieChart,
} from "@/app/components/charts";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";
import { BsCart2 } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaArrowDown } from "react-icons/fa6";

const Page = () => {
  type TimeFilter =
    | "today"
    | "yesterday"
    | "this_week"
    | "this_month"
    | "custom";
  type OrderFilter =
    | "all"
    | "awaiting_payment"
    | "paid"
    | "delivered"
    | "canceled";
  const [activeTime, setActiveTime] = useState<TimeFilter>("today");
  const [activeOrder, setActiveOrder] = useState<OrderFilter>("all");
  const [addProduct, setAddProduct] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "this_week", label: "This Week" },
    { key: "this_month", label: "This Month" },
    { key: "custom", label: "Custom Date" },
  ];
  const ORDER_FILTERS: { key: OrderFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "awaiting_payment", label: "Awaiting Payment" },
    { key: "paid", label: "Paid" },
    { key: "delivered", label: "Delivered" },
    { key: "canceled", label: "Canceled" },
  ];

  const num = [
    {
      icon: <BsCart2 />,
      label: "Gros Income",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Total Discount",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Net Income",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Inventry Count",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Staff on duty",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Total orders",
      value: 0,
      percent: 0,
      direction: <FaArrowDown />,
    },
  ];
  const [activeSection, setActiveSection] = useState<SectionTab>("overview");

  type SectionTab =
    | "overview"
    | "products"
    | "order"
    | "stock"
    | "configuration";
  const SECTION_TABS: { key: SectionTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "products", label: "Products" },
    { key: "order", label: "Orders Management" },
    { key: "stock", label: "Stock Management" },
    { key: "configuration", label: "Configuration" },
  ];

  const barData = useMemo(
    () => [
      { name: "09:00", time: "09:00", income: 3000, expenses: 1200 },
      { name: "10:00", time: "10:00", income: 2500, expenses: 2200 },
      { name: "11:00", time: "11:00", income: 6800, expenses: 0 },
      { name: "12:00", time: "12:00", income: 3200, expenses: 2900 },
      { name: "01:00", time: "01:00", income: 8200, expenses: 8500 },
      { name: "02:00", time: "02:00", income: 9800, expenses: 6500 },
      { name: "03:00", time: "03:00", income: 9900, expenses: 6400 },
    ],
    []
  );
  const pieData = useMemo(
    () => [
      { name: "Income", value: 20000000 },
      { name: "Expenses", value: 20000000 },
    ],
    []
  );

  const [bulkProduct, setBulkProduct] = useState(false);

  const [variantManagement, setVariantManagement] = useState(false);
  return (
    <main className="flex-1 w-full md:ml-64">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between my-2 gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Inventory</h1>
          </div>
          <div className="w-full md:flex md:justify-end mb-1">
            <div className="w-full md:w-auto border rounded-lg bg-white p-1">
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex gap-2">
                  {TIME_FILTERS.map((t) => (
                    <button
                      key={t.key}
                      className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                        activeTime === t.key
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTime(t.key)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-0">
              {activeSection === "products" && addProduct && (
                <RegularButton
                  label={
                    <>
                      <p className="flex items-center p-1 md:p-2 gap-2">
                        <FaTable className="w-4 h-4" /> Show Table
                      </p>
                    </>
                  }
                  onClick={() => {
                    setAddProduct(false);
                  }}
                  className="!px-2 !py-1 !text-sm !min-w-0 !shadow-none md:px-3 md:py-2"
                />
              )}
              {activeSection === "products" && !addProduct && (
                <RegularButton
                  label={
                    <>
                      <p className="flex items-center p-1 md:p-2 gap-2">
                        <PlusIcon className="w-4 h-4" /> Add a Product
                      </p>
                    </>
                  }
                  onClick={() => {
                    setAddProduct(true);
                  }}
                  className="!px-2 !py-1 !text-sm !min-w-0 !shadow-none md:px-3 md:py-2"
                />
              )}

              {activeSection === "order" && (
                <RegularButton
                  label={
                    <>
                      <p className="flex items-center p-1 md:p-2 gap-2">
                        <PlusIcon className="w-4 h-4" /> Create Order
                      </p>
                    </>
                  }
                  onClick={() => {}}
                  className="!px-2 !py-1 !text-sm !min-w-0 !shadow-none md:px-3 md:py-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Lower grid: Pie + two tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-7">
          {/* Overview */}
          {activeSection === "overview" && (
            <>
              {num.map((n) => (
                <div
                  className="bg-white rounded-xl shadow-sm p-3 sm:p-6 text-gray-800 flex flex-col gap-5"
                  key={n.label}
                >
                  <div>
                    <div className="border rounded-md p-2 w-fit">{n.icon}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm md:text-md font-semibold">
                      {n.value}
                    </p>
                    <div className="flex items-center gap-1 border w-fit p-1 rounded-md text-red-400">
                      <p className="text-sm">{n.direction}</p>
                      <p className="text-sm">{n.percent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Tabs: Section Switcher */}
        <div className="w-full mb-1">
          <div className="w-full border rounded-lg bg-white p-1">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-2 md:justify-between">
                {SECTION_TABS.map((t) => (
                  <button
                    key={t.key}
                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                      activeSection === t.key
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveSection(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content by section */}
      {activeSection === "overview" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          {/* Big Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Stock Movement
            </h3>
            <div className="h-72">
              <AppLineChart
                data={barData}
                dataKey="income"
                xAxisKey="time"
                showGrid
                showLegend
                showTooltip
                height={"100%"}
                width={"100%"}
                className="h-full"
              />
            </div>
          </div>

          {/* Lower grid: Pie + two tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="text-gray-800">
                {/* <h3 className="text-sm font-semibold">Sales By Category</h3> */}
                <p className="text-sm font-semibold text-gray-800">
                  Sales By Category
                </p>
                <p className="text-xs text-gray-600">
                  Breakdown Of Sales by Product Category
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                <div className="h-64 w-full md:w-1/2 md:mt-8">
                  <AppPieChart
                    data={pieData}
                    dataKey="value"
                    xAxisKey="name"
                    showLegend={false}
                    showTooltip
                    height={"100%"}
                    width={"100%"}
                    className="h-full w-full"
                    colors={["#10B981", "#EF4444"]}
                  />
                </div>
                <div className="flex flex-col gap-2 text-gray-800 w-full md:w-1/2">
                  <p className="text-xs md:text-sm text-gray-600">
                    Today&apos;s Revenue
                  </p>
                  <h3 className="text-sm md:text-md font-semibold mb-4">
                    $200&apos;000&apos;000&apos;000
                    <div className="flex items-center gap-1 border w-fit p-1 rounded-md text-green-400 text-xs md:text-sm">
                      <p className="text-xs md:text-sm">
                        <FaArrowUp />
                      </p>
                      <p className="text-xs md:text-sm">12%</p>
                    </div>
                  </h3>

                  <div className="text-gray-900 flex flex-row items-center gap-4">
                    <div>
                      {" "}
                      <p className="flex items-center gap-1 text-xs md:text-sm">
                        <span className="w-3 h-3 rounded-lg bg-green-500"></span>
                        Income
                      </p>
                      <p className="flex items-center gap-1 text-xs md:text-sm">
                        <span className="w-3 h-3 rounded-lg bg-red-500"></span>
                        Expenses
                      </p>
                    </div>
                    <div className="text-gray-800 w-full md:w-1/3 flex flex-col gap-1 text-xs md:text-sm">
                      <p>$200,000,000</p>
                      <p>$200,000,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              {/* Sales Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 h-95 text-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold">Sales Overview</h3>
                    <p className="text-xs text-gray-600">
                      Products that have reached threshold
                    </p>
                  </div>
                  <div className="gap-3 hidden md:flex">
                    <SelectDropdown
                      options={[
                        { value: "all", label: "All Categories" },
                        { value: "utilities", label: "Utilities" },
                        { value: "maintenance", label: "Maintenance" },
                        { value: "supplies", label: "Supplies" },
                        { value: "other", label: "Other" },
                      ]}
                      placeholder="Check out date"
                      className="w-48"
                      onChange={(value) => console.log("Category:", value)}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="py-2">Product</th>
                        <th className="py-2">Units Sold</th>
                        <th className="py-2">Total Revenue</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "products" && !addProduct && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          {/* Big Bar Chart */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="md:text-lg text-sm font-semibold text-gray-900">
                  Stock Investments
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Monitor the flow of your inventory in and out of the storage
                </p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="">
              <nav className="flex bg-white gap-5 w-fit" aria-label="Tabs">
                {["All"].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-2 text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
                      activeCategory === t
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveCategory(t)}
                  >
                    {t}
                  </button>
                ))}
              </nav>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by Order Name / ID"
                    className="w-full h-8 bg-gray-100 p-2 border border-gray-300 rounded-md text-gray-600 placeholder:text-gray-400 placeholder:text-xs md:text-sm"
                  />
                </div>
                <div className="hidden md:flex items-center gap-2 text-gray-800 w-48">
                  <SelectDropdown
                    options={[
                      { value: "name-asc", label: "Name (A-Z)" },
                      { value: "name-desc", label: "Name (Z-A)" },
                      { value: "stock-asc", label: "Stock (Low to High)" },
                      { value: "stock-desc", label: "Stock (High to Low)" },
                    ]}
                    placeholder="Sort by"
                    className="w-full"
                    onChange={(value) => {
                      // Handle sort logic here
                      console.log("Sort by:", value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stock Table */}
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
                            <div className="sm:hidden mb-1 font-semibold">
                              Base SKU
                            </div>
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
                            <div className="sm:hidden mb-1 font-semibold">
                              Category
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">
                              {item.category}
                            </span>
                          </td>

                          {/* Location */}
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div className="sm:hidden mb-1 font-semibold">
                              Brand
                            </div>
                            <div className="flex items-center">
                              {item.brand}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div className="sm:hidden mb-1 font-semibold">
                              Threshold
                            </div>
                            <div className="flex items-center">
                              {item.threshold}
                            </div>
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
                            <div className="sm:hidden mb-2 font-semibold">
                              Actions
                            </div>
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
                                console.log(
                                  "Report suspicious activity:",
                                  item.id
                                );
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">5</span> of{" "}
                    <span className="font-medium">24</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "products" && addProduct && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="flex flex-col gap-3 w-full md:w-2/3">
              <p className="text-gray-800 mt-4 text-sm md:text-base">
                New Inventory Item
              </p>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 mt-1">
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="productName"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="productName"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Product Name
                  </label>
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    id="brand"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="brand"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Brand
                  </label>
                </div>

                <div className="flex gap-3 w-full mb-6">
                  <div className="relative flex-1">
                    <select
                      id="category"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    >
                      <option value=""> </option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                      <option value="Category 3">Category 3</option>
                    </select>
                    <label
                      htmlFor="category"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Category
                    </label>
                  </div>

                  <div className="relative w-1/2">
                    <input
                      type="text"
                      id="unit"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="unit"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Unit
                    </label>
                  </div>
                </div>

                <div className="relative ">
                  <input
                    type="number"
                    id="threshold"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="threshold"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Threshold
                  </label>
                </div>
              </div>
            </div>
            <div className="text-gray-600 w-full md:w-1/3">
              <div className="flex justify-center md:justify-end gap-3">
                <RegularButton
                  label={
                    <p className="text-sm flex items-center justify-self-center gap-2">
                      <PlusIcon className="w-4 h-4" /> Bulk Product Add
                    </p>
                  }
                  className="!bg-transparent !text-gray-600 !border !border-gray-600 w-1/2 !py-2 !px-2"
                  onClick={() => setBulkProduct(true)}
                />
                <RegularButton
                  label={<p className="text-sm">Save & Publish</p>}
                  className="w-1/2"
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 text-sm">Variant Management</p>
                  <Switch
                    className=""
                    checked={variantManagement}
                    onClick={() => {
                      if (true) {
                        toast.error("Please select a category");
                      }
                    }}
                    onChange={() => setVariantManagement(!variantManagement)}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "order" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          {/* Big Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900">
            <h3 className="text-md font-semibold mb-2">Orders</h3>
            <p className="text-xs md:text-sm text-gray-600">
              Track and manage product orders, including status, quantity and
              customer details
            </p>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"></div>

              {/* Category Tabs */}
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="inline-flex w-fit bg-white p-1 rounded-lg">
                  <nav className="flex space-x-1" aria-label="Tabs">
                    {[
                      "All",
                      "Awaiting Payment",
                      "Paid",
                      "Delivered",
                      "Cancelled",
                    ].map((t) => (
                      <button
                        key={t}
                        className={`px-3 py-2 text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
                          activeCategory === t
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveCategory(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search by Order Name / ID"
                      className="w-full h-8 bg-gray-100 p-2 border border-gray-300 rounded-md text-gray-600 placeholder:text-gray-400 placeholder:text-xs md:text-sm"
                    />
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-800 w-48">
                    <SelectDropdown
                      options={[
                        { value: "name-asc", label: "Name (A-Z)" },
                        { value: "name-desc", label: "Name (Z-A)" },
                        { value: "stock-asc", label: "Stock (Low to High)" },
                        { value: "stock-desc", label: "Stock (High to Low)" },
                      ]}
                      placeholder="Sort by"
                      className="w-full"
                      onChange={(value) => {
                        // Handle sort logic here
                        console.log("Sort by:", value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Stock Table */}
              <div className="overflow-hidden shadow rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
                    <thead className="bg-gray-50">
                      <tr className="hidden sm:table-row">
                        <th className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">
                          Order ID
                        </th>
                        <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                          Supplier
                        </th>
                        <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                          Order Date
                        </th>
                        <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                          Expected Delivery Date
                        </th>
                        <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {[
                        {
                          id: "#ORD-2023-1001",
                          supplier: "GasPro Distributors",
                          orderDate: "2023-09-15T09:30:00",
                          deliveryDate: "2023-09-20T00:00:00",
                          status: "pending",
                          statusText: "Awaiting Payment",
                        },
                        {
                          id: "#ORD-2023-1002",
                          supplier: "FlameTech Energy",
                          orderDate: "2023-09-14T11:20:00",
                          deliveryDate: "2023-09-18T00:00:00",
                          status: "processing",
                          statusText: "Processing",
                        },
                        {
                          id: "#ORD-2023-1003",
                          supplier: "SafeGas Solutions",
                          orderDate: "2023-09-10T14:45:00",
                          deliveryDate: "2023-09-15T00:00:00",
                          status: "shipped",
                          statusText: "In Transit",
                        },
                      ].map((item) => {
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            {/* Date & Time */}
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6">
                              <div className="sm:hidden mb-1 font-semibold">
                                Order ID
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">
                                  {item.id}
                                </span>
                              </div>
                            </td>

                            {/* Device */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                Supplier
                              </div>
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <div className="font-medium text-gray-900">
                                    {item.supplier}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* IP Address */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                Order Date
                              </div>
                              <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">
                                {item.orderDate}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                Expected Delivery Date
                              </div>
                              <div className="flex items-center">
                                {item.deliveryDate}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <div className="sm:hidden mb-1 font-semibold">
                                Status
                              </div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === "success"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.statusText}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
                              <div className="sm:hidden mb-2 font-semibold">
                                Actions
                              </div>
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
                                  console.log(
                                    "Report suspicious activity:",
                                    item.id
                                  );
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

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">5</span> of{" "}
                      <span className="font-medium">24</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        9
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        10
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-10">
              <p className="text-xs text-gray-500">Total Stocks: 374</p>
              <Pagination
                currentPage={1}
                totalPages={2}
                onPageChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === "stock" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          {/* Big Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 space-y-6">
            <h3 className="text-md font-semibold mb-2">Stocks</h3>
            <p className="text-xs md:text-sm text-gray-500">
              Monitor the flow of your inventory in and out of the storage
            </p>

            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="inline-flex w-fit bg-white p-1 rounded-lg">
                  <nav className="flex space-x-1" aria-label="Tabs">
                    {[
                      "All",
                      "Awaiting Payment",
                      "Paid",
                      "Delivered",
                      "Cancelled",
                    ].map((t) => (
                      <button
                        key={t}
                        className={`px-3 py-2 text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
                          activeCategory === t
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveCategory(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by Order Name / ID"
                    className="w-full h-8 bg-gray-100 p-2 border border-gray-300 rounded-md text-gray-600 placeholder:text-gray-400 placeholder:text-xs md:text-sm"
                  />
                </div>
                <div className="hidden md:flex items-center gap-2 text-gray-800 w-48">
                  <SelectDropdown
                    options={[
                      { value: "name-asc", label: "Name (A-Z)" },
                      { value: "name-desc", label: "Name (Z-A)" },
                      { value: "stock-asc", label: "Stock (Low to High)" },
                      { value: "stock-desc", label: "Stock (High to Low)" },
                    ]}
                    placeholder="Sort by"
                    className="w-full"
                    onChange={(value) => {
                      // Handle sort logic here
                      console.log("Sort by:", value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stock Table */}
            <div className="overflow-hidden shadow rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
                  <thead className="bg-gray-50">
                    <tr className="hidden sm:table-row">
                      <th className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">
                        Order ID
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Supplier
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Order Date
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Expected Delivery Date
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[
                      {
                        id: "#ORD-2023-1001",
                        supplier: "GasPro Distributors",
                        orderDate: "2023-09-15T09:30:00",
                        deliveryDate: "2023-09-20T00:00:00",
                        status: "pending",
                        statusText: "Awaiting Payment",
                      },
                      {
                        id: "#ORD-2023-1002",
                        supplier: "FlameTech Energy",
                        orderDate: "2023-09-14T11:20:00",
                        deliveryDate: "2023-09-18T00:00:00",
                        status: "processing",
                        statusText: "Processing",
                      },
                      {
                        id: "#ORD-2023-1003",
                        supplier: "SafeGas Solutions",
                        orderDate: "2023-09-10T14:45:00",
                        deliveryDate: "2023-09-15T00:00:00",
                        status: "shipped",
                        statusText: "In Transit",
                      },
                    ].map((item) => {
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {/* Date & Time */}
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6">
                            <div className="sm:hidden mb-1 font-semibold">
                              Order ID
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">
                                {item.id}
                              </span>
                            </div>
                          </td>

                          {/* Device */}
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div className="sm:hidden mb-1 font-semibold">
                              Supplier
                            </div>
                            <div className="flex items-center">
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">
                                  {item.supplier}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* IP Address */}
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div className="sm:hidden mb-1 font-semibold">
                              Order Date
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">
                              {item.orderDate}
                            </span>
                          </td>

                          {/* Location */}
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div className="sm:hidden mb-1 font-semibold">
                              Expected Delivery Date
                            </div>
                            <div className="flex items-center">
                              {item.deliveryDate}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="sm:hidden mb-1 font-semibold">
                              Status
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.statusText}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
                            <div className="sm:hidden mb-2 font-semibold">
                              Actions
                            </div>
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
                                console.log(
                                  "Report suspicious activity:",
                                  item.id
                                );
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

            <div className="flex items-center justify-between mt-10">
              <p className="text-xs text-gray-500">Total Stocks: 374</p>
              <Pagination
                currentPage={1}
                totalPages={2}
                onPageChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {activeSection !== "overview" &&
        activeSection !== "products" &&
        activeSection !== "order" && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              <p className="text-sm">
                {SECTION_TABS.find((s) => s.key === activeSection)?.label}{" "}
                content will appear here.
              </p>
            </div>
          </div>
        )}
      <Toast />
    </main>
  );
};

export default Page;
