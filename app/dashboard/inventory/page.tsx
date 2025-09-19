"use client";

import { RegularButton } from "@/app/components/Button";
import {
  SectionTabInput,
  SelectDropdown,
  Switch,
  Textarea,
} from "@/app/components/Input";
import { Pagination } from "@/app/components/Pagination";
import { PlusIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { FaTable } from "react-icons/fa";
import {
  LineChart as AppLineChart,
  PieChart as AppPieChart,
} from "@/app/components/charts";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";
import { BsCart2 } from "react-icons/bs";
import { FaArrowDown, FaPlus } from "react-icons/fa6";
import { Select } from "radix-ui";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Pane } from "@/app/components/Tabpane";
import { DateRangeModal } from "@/app/components/DateRangeModal";
import { StockTable } from "@/app/components/Table";
import { AddCategoryModal } from "@/app/components/AddCategoryModal";
import { AddCustomVariant } from "@/app/components/AddCustomVariant";
import { BulkProductAdd } from "@/app/components/BulkProductAdd";
import { BarChart as AppBarChart } from "@/app/components/charts";
import { Bar } from "recharts";
import VariantSide from "./VariantSide";

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
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false);

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
  const CATEGORIES: { key: string; label: string }[] = [
    { key: "all", label: "All" },
    { key: "shoes", label: "Shoes" },
    { key: "clothing", label: "Clothing" },
    { key: "electronics", label: "Electronics" },
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

  const [variantManagement, setVariantManagement] = useState(true);

  const [additionalImage, setAdditionalImage] = useState([1, 2]);

  const handleAddImage = () => {
    if (additionalImage.length >= 5) {
      toast.error("You can only add 5 images");
      return;
    } else {
      setAdditionalImage([...additionalImage, additionalImage.length + 1]);
    }
  };
  const [showDateModal, setShowDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [hasVariation, setHasVariation] = useState(false);
  const [variantName, setVariantName] = useState("");
  const [savedVariants, setSavedVariants] = useState<
    { name: string; values: string[] }[]
  >([]);

  const handleAddVariant = () => {
    const name = variantName.trim();
    if (!name) {
      toast.error("Variant name is required");
      return;
    }
    // Prevent duplicates (case-insensitive) in both lists
    const existsInVariants = variants.some(
      (v) => v.toLowerCase() === name.toLowerCase()
    );
    const existsInSaved = savedVariants.some(
      (v) => v.name.toLowerCase() === name.toLowerCase()
    );
    if (existsInVariants || existsInSaved) {
      toast.error("Variant already exists");
      return;
    }

    // Update simple variants list (used for selection elsewhere)
    setVariants((prev) => [...prev, name]);

    // Update detailed saved variants list
    const newVariant = {
      name,
      values: [],
    };
    setSavedVariants([...savedVariants, newVariant]);
    setVariantName("");
    setIsAddVariantOpen(false);
    toast.success("Variant added successfully");
  };

  const orderTabs: { key: OrderFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "awaiting_payment", label: "Awaiting Payment" },
    { key: "paid", label: "Paid" },
    { key: "delivered", label: "Delivered" },
    { key: "canceled", label: "Canceled" },
  ];

  const configureTabs = [
    { key: "category", label: "Category" },
    { key: "attributes", label: "Attributes" },
    { key: "taxes", label: "Taxes" },
    { key: "discounts", label: "Discounts" },
    { key: "coupons", label: "Coupons" },
  ];
  const [activeConfigure, setActiveConfigure] = useState("category");

  const categoriesprod = ["Shoes", "Clothing", "Electronics"];

  return (
    <main className="flex-1 w-full md:ml-64">
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between my-2 gap-3 md:mt-2 -mb-2">
          <div>
            <h1 className="md:text-xl text-lg font-semibold text-gray-900 -mb-2 md:mb-0">
              Inventory
            </h1>
          </div>
          <div className={`w-full md:flex md:justify-end md:mb-2`}>
            <div className="w-full md:w-auto border rounded-lg">
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex gap-2 mt-2 md:mt-0 mb-6 ">
                  {activeSection === "overview" && (
                    <Pane
                      tabs={TIME_FILTERS}
                      setActiveSection={(section: TimeFilter) =>
                        setActiveTime(section)
                      }
                      activeSection={activeTime}
                      setShowDateModal={(show: boolean): void => {
                        setShowDateModal(show);
                      }}
                    />
                  )}
                  {activeSection === "products" && !addProduct && (
                    <RegularButton
                      onClick={() => setAddProduct(true)}
                      label={
                        <p className="text-sm flex items-center">
                          <FaPlus /> Add Product
                        </p>
                      }
                      className="text-sm"
                    />
                  )}
                  {activeSection === "products" && addProduct && (
                    <RegularButton
                      onClick={() => setAddProduct(false)}
                      label={
                        <p className="text-sm flex items-center gap-2">
                          <FaTable /> Show Table
                        </p>
                      }
                      className="text-sm"
                    />
                  )}

                  <DateRangeModal
                    isOpen={showDateModal}
                    onClose={() => setShowDateModal(false)}
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onApply={() => {
                      if (startDate && endDate) {
                        setCustomDate(`${startDate} to ${endDate}`);
                        setActiveTime("custom");
                      }
                      setShowDateModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lower grid: Pie + two tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4">
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
          <div className="w-full border rounded-lg bg-white p-1 md:mb-3">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-2 md:justify-between">
                <Pane
                  tabs={SECTION_TABS}
                  setActiveSection={(section: SectionTab) =>
                    setActiveSection(section)
                  }
                  activeSection={activeSection}
                  mainPane={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content by section */}
      {activeSection === "overview" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
          {/* Big Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="flex justify-between">
              <div className="mb-3 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-900">
                  Stock Movement
                </h3>
                <p className="text-xs text-gray-600">
                  Monitor your stocks in real time
                </p>
              </div>
              <div>
                <SelectDropdown
                  placeholder="Available Products Graph"
                  options={[
                    { value: "all", label: "Available Products Graph" },
                  ]}
                  onChange={(value) => console.log("Category:", value)}
                />
              </div>
            </div>

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
                  Inventory Distribution
                </p>
                <p className="text-xs text-gray-600">
                  Manage how stock is allocated and transferred
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
                  <div className="text-gray-900 flex flex-row items-center gap-4">
                    <div>
                      {" "}
                      <p className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 rounded-lg bg-green-500"></span>
                        Available
                      </p>
                      <p className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 rounded-lg bg-red-500"></span>
                        Reserved
                      </p>
                    </div>
                    <div className="text-gray-800 w-full md:w-1/3 flex flex-col gap-1 text-xs">
                      <p>31%</p>
                      <p>69%</p>
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
                    <h3 className="text-sm font-semibold">Low Stock Items</h3>
                    <p className="text-xs text-gray-600">
                      Products that have reached threshold
                    </p>
                  </div>
                  <div className="gap-3 hidden md:flex">
                    <SelectDropdown
                      options={[
                        { value: "all", label: "Checkout List" },
                        { value: "low_stock", label: "Low Stock" },
                        { value: "out_stock", label: "Out Stock" },
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
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
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
            <div className="md:w-fit mb-4">
              <Pane
                tabs={CATEGORIES}
                setActiveSection={(section: string) =>
                  setActiveCategory(section)
                }
                activeSection={activeCategory}
              />
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="relative flex-1">
                  <SectionTabInput placeholder="Search by Order Name / ID" />
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
            <StockTable
              columns={[
                {
                  key: "baseSKU",
                  label: "Base SKU",
                },
                {
                  key: "productName",
                  label: "Product Name",
                },
                {
                  key: "category",
                  label: "Category",
                },
                {
                  key: "brand",
                  label: "Brand",
                },
                {
                  key: "threshold",
                  label: "Threshold",
                },
                {
                  key: "hasVariation",
                  label: "Has Variation",
                },
              ]}
              rows={[
                {
                  baseSKU: "123456",
                  productName: "Product 1",
                  category: "Clothing",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: "Yes",
                },
                {
                  baseSKU: "123456",
                  productName: "Product 1",
                  category: "Electronics",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: "No",
                },
              ]}
              onView={() => console.log("View")}
              onDelete={() => console.log("Delete")}
            />

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalPages={2}
              onPageChange={(page) => console.log("Page changed to:", page)}
              label={
                <>
                  <p>Time Stock: 0</p>
                </>
              }
            />
          </div>
        </div>
      )}

      {activeSection === "products" && addProduct && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
          <BulkProductAdd
            isOpen={bulkProduct}
            onClose={() => setBulkProduct(false)}
            onAddProducts={(products) => console.log(products)}
          />
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full gap-3 md:gap-0">
            <p className="text-gray-800 text-md mt-5">New Inventory Item</p>
            <div className="flex gap-2">
              <RegularButton
                label={
                  <p className="text-xs flex items-center gap-2 w-20 text-center">
                    <PlusIcon className="w-4 h-4" /> <span>Bulk Add</span>
                  </p>
                }
                className="!bg-transparent !text-gray-600 !border !border-gray-600 w-1/2 !py-2 !px-2"
                onClick={() => setBulkProduct(true)}
              />
              <RegularButton
                label={<p className="text-xs">Save & Publish</p>}
                className="w-2/3"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 flex flex-col gap-6">
              <div className="relative ">
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

              <div className="relative ">
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

              <div className="flex gap-3 w-full flex-col md:flex-row">
                <div className="relative flex-1">
                  <Select.Root>
                    <Select.Trigger className="flex items-center justify-between gap-2 shadow-sm p-2.5 w-full rounded-sm text-gray-600 border border-gray-300   hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <Select.Value placeholder="Select a category" />
                      <FaAngleDown className="text-gray-500" />
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-white rounded-md shadow-lg">
                        <Select.Viewport className="p-1">
                          {categoriesprod ? (
                            categoriesprod.map((category) => (
                              <Select.Item
                                key={category}
                                value={category}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                              >
                                <Select.ItemText>{category}</Select.ItemText>
                              </Select.Item>
                            ))
                          ) : (
                            <Select.Item
                              value=""
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                            >
                              <Select.ItemText>
                                No categories found. Create one
                              </Select.ItemText>
                            </Select.Item>
                          )}
                        </Select.Viewport>
                        <Select.Arrow />
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  <p
                    className="text-xs text-gray-500 mt-2 cursor-pointer"
                    onClick={() => setIsAddCategoryOpen(true)}
                  >
                    + Add New Category
                  </p>
                  <AddCategoryModal
                    isOpen={isAddCategoryOpen}
                    onClose={() => setIsAddCategoryOpen(false)}
                    onAddCategory={(category) => {
                      console.log("New category:", category);
                      // Add your logic to handle the new category
                    }}
                  />
                </div>
                <div className="relative ">
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
                <p className="text-[14px] mb-1">
                  Base SKU *{" "}
                  <span className="text-gray-500 text-[10px]">
                    (Auto-generated)
                  </span>
                </p>
                <input
                  type="number"
                  id="threshold"
                  className="block px-2.5 pb-3 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer placeholder:text-[12px] mb-1"
                  placeholder="Auto-generated from product name"
                  disabled
                />
                <span className="flex items-center gap-1">
                  <input type="checkbox" />
                  <p className="text-[12px]">Taxable</p>
                </span>
              </div>

              <div className="flex items-center gap-2 justify-between  text-sm text-gray-500">
                <p>Has Variation</p>
                <Switch
                  checked={hasVariation}
                  onChange={() => setHasVariation(!hasVariation)}
                />
              </div>

              <div className="flex flex-col text-sm text-gray-500">
                <p>Product Description</p>
                <Textarea label="Description" className="w-full -mt-2" />
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-500 ">
                <p>Product Image</p>
                <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 32 32"
                      className="w-8 h-8 mb-4 text-primary"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 16 7 C 13.351563 7 11.050781 8.238281 9.40625 10.0625 C 9.269531 10.046875 9.148438 10 9 10 C 6.800781 10 5 11.800781 5 14 C 3.269531 15.054688 2 16.835938 2 19 C 2 22.300781 4.699219 25 8 25 L 13 25 L 13 23 L 8 23 C 5.78125 23 4 21.21875 4 19 C 4 17.339844 5.007813 15.921875 6.4375 15.3125 L 7.125 15.03125 L 7.03125 14.28125 C 7.011719 14.117188 7 14.023438 7 14 C 7 12.882813 7.882813 12 9 12 C 9.140625 12 9.296875 12.019531 9.46875 12.0625 L 10.09375 12.21875 L 10.46875 11.71875 C 11.75 10.074219 13.75 9 16 9 C 19.277344 9 22.011719 11.253906 22.78125 14.28125 L 22.96875 15.0625 L 23.8125 15.03125 C 24.023438 15.019531 24.070313 15 24 15 C 26.21875 15 28 16.78125 28 19 C 28 21.21875 26.21875 23 24 23 L 19 23 L 19 25 L 24 25 C 27.300781 25 30 22.300781 30 19 C 30 15.84375 27.511719 13.316406 24.40625 13.09375 C 23.183594 9.574219 19.925781 7 16 7 Z M 16 15 L 12 19 L 15 19 L 15 27 L 17 27 L 17 19 L 20 19 Z"></path>
                    </svg>
                    <p className="mb-2 text-sm text-primary">
                      <span className="font-semibold">Upload Main Image</span>
                    </p>
                    <p className="text-xs text-primary">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    accept="image/*"
                    multiple={false}
                    tabIndex={-1}
                    type="file"
                    style={{
                      border: "0px",
                      clip: "rect(0px, 0px, 0px, 0px)",
                      clipPath: "inset(50%)",
                      height: "1px",
                      margin: "0px -1px -1px 0px",
                      overflow: "hidden",
                      padding: "0px",
                      position: "absolute",
                      width: "1px",
                      whiteSpace: "nowrap",
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>Additional Images</p>
                <RegularButton
                  label="Add more"
                  className="text-xs"
                  onClick={handleAddImage}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-500">
                {additionalImage.map((image) => (
                  <div
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    key={image}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 32 32"
                        className="w-8 h-8 mb-4 text-primary"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 16 7 C 13.351563 7 11.050781 8.238281 9.40625 10.0625 C 9.269531 10.046875 9.148438 10 9 10 C 6.800781 10 5 11.800781 5 14 C 3.269531 15.054688 2 16.835938 2 19 C 2 22.300781 4.699219 25 8 25 L 13 25 L 13 23 L 8 23 C 5.78125 23 4 21.21875 4 19 C 4 17.339844 5.007813 15.921875 6.4375 15.3125 L 7.125 15.03125 L 7.03125 14.28125 C 7.011719 14.117188 7 14.023438 7 14 C 7 12.882813 7.882813 12 9 12 C 9.140625 12 9.296875 12.019531 9.46875 12.0625 L 10.09375 12.21875 L 10.46875 11.71875 C 11.75 10.074219 13.75 9 16 9 C 19.277344 9 22.011719 11.253906 22.78125 14.28125 L 22.96875 15.0625 L 23.8125 15.03125 C 24.023438 15.019531 24.070313 15 24 15 C 26.21875 15 28 16.78125 28 19 C 28 21.21875 26.21875 23 24 23 L 19 23 L 19 25 L 24 25 C 27.300781 25 30 22.300781 30 19 C 30 15.84375 27.511719 13.316406 24.40625 13.09375 C 23.183594 9.574219 19.925781 7 16 7 Z M 16 15 L 12 19 L 15 19 L 15 27 L 17 27 L 17 19 L 20 19 Z"></path>
                      </svg>
                      <p className="mb-2 text-sm text-primary">
                        <span className="font-semibold">Upload Main Image</span>
                      </p>
                      <p className="text-xs text-primary">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      accept="image/*"
                      multiple={false}
                      tabIndex={-1}
                      type="file"
                      style={{
                        border: "0px",
                        clip: "rect(0px, 0px, 0px, 0px)",
                        clipPath: "inset(50%)",
                        height: "1px",
                        margin: "0px -1px -1px 0px",
                        overflow: "hidden",
                        padding: "0px",
                        position: "absolute",
                        width: "1px",
                        whiteSpace: "nowrap",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 h-fit">
              {!hasVariation && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 text-sm md:text-lg">
                      Variant Management
                    </p>
                    <Switch
                      className=""
                      // checked={variantManagement}
                      // checked={true}
                      // onClick={() => {
                      //   if (true) {
                      //     toast.error("Please select a category");
                      //   }
                      // }}
                      onChange={() => setVariantManagement(!variantManagement)}
                      // disabled={}
                    />
                  </div>
                  {variantManagement && (
                    <VariantSide
                      setIsAddVariantOpen={setIsAddVariantOpen}
                      variants={variants}
                      savedVariants={savedVariants}
                    />
                  )}
                </>
              )}
              {hasVariation && (
                <>
                  <StockTable
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "costPrice", label: "Cost Price" },
                      { key: "sellingPrice", label: "Selling Price" },
                      { key: "quantity", label: "Quantity" },
                      { key: "threshold", label: "Threshold" },
                    ]}
                    rows={[
                      {
                        name: "Color",
                        costPrice: 100,
                        sellingPrice: 150,
                        quantity: 100,
                        threshold: 100,
                      },
                    ]}
                    onView={() => {}}
                    onDelete={() => {}}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSection === "order" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
          {/* Big Bar Chart */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
              <div>
                <h2 className="md:text-lg text-md font-semibold text-gray-900">
                  Orders
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Track and manage product orders, including status, quantity
                  and customer details
                </p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mt-4 md:w-fit">
              <Pane
                tabs={orderTabs}
                setActiveSection={(section: OrderFilter) =>
                  setActiveOrder(section)
                }
                activeSection={activeOrder}
              />
            </div>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="relative flex-1">
                  <SectionTabInput placeholder="Search by Order Name / ID" />
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
            <StockTable
              columns={[
                { key: "orderId", label: "Order ID" },
                { key: "supplier", label: "Supplier" },
                { key: "orderDate", label: "Order Date" },
                { key: "deliveryDate", label: "Expected Delivery Date" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                {
                  orderId: "#ORD-2023-1001",
                  supplier: "FlameTech Energy",
                  orderDate: "2023-09-14T11:20:00",
                  deliveryDate: "2023-09-18T00:00:00",
                  status: "Processing",
                },
                {
                  orderId: "#ORD-2023-1002",
                  supplier: "FlameTech Energy",
                  orderDate: "2023-09-14T11:20:00",
                  deliveryDate: "2023-09-18T00:00:00",
                  status: "Processing",
                },
                {
                  orderId: "#ORD-2023-1003",
                  supplier: "SafeGas Solutions",
                  orderDate: "2023-09-10T14:45:00",
                  deliveryDate: "2023-09-15T00:00:00",
                  status: "Shipped",
                },
              ]}
              onView={() => {}}
              onReport={() => {}}
            />

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalPages={2}
              onPageChange={(page) => console.log("Page changed to:", page)}
              label={
                <>
                  <p>Time Stock: 0</p>
                </>
              }
            />
          </div>
        </div>
      )}

      {activeSection === "stock" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
          {/* Big Bar Chart */}
          <div className="p-4 sm:p-1 overflow-hidden md:mb-7 mb-4 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Stocks
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Monitor the flow of your inventory in and out of the storage
                </p>
              </div>
              <div className="text-gray-900 flex flex-col md:flex-row items-center md:items-start gap-2">
                <p className="flex items-center gap-1 text-xs md:text-base">
                  <span className="w-3 h-3 rounded-lg bg-green-500"></span>
                  Income
                </p>
                <p className="flex items-center gap-1 text-xs md:text-base">
                  <span className="w-3 h-3 rounded-lg bg-red-500"></span>
                  Expenses
                </p>
              </div>
            </div>

            <div className="h-72 mt-3 md:mt-0">
              <AppBarChart
                data={barData}
                dataKey="income"
                xAxisKey="time"
                title="Income and Expenses"
                description="Daily income and expenses overview"
                width="100%"
                height="100%"
                className="h-full"
                fillColor="#10B981"
                strokeColor="#10B981"
                showLegend={false}
              >
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#EF4444"
                  stroke="#EF4444"
                />
              </AppBarChart>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="relative flex-1">
                <SectionTabInput placeholder="Search by Order Name / ID" />
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

          <StockTable
            columns={[
              { key: "item", label: "Item" },
              { key: "date", label: "Date" },
              { key: "type", label: "Type" },
              { key: "quantity", label: "Quantity" },
              { key: "addedBy", label: "Added By" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                item: "Spoon",
                date: "21/09/2025",
                type: "Income",
                quantity: 10,
                addedBy: "Admin",
                status: "Active",
              },
              {
                item: "Spoon",
                date: "21/09/2025",
                type: "Expense",
                quantity: 10,
                addedBy: "Staff",
                status: "Pending",
              },
            ]}
            onView={() => {}}
            className="mb-6"
          />
        </div>
      )}

      {activeSection === "configuration" && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
          {/* Big Bar Chart */}
          <div className="mt-4 md:w-fit">
            <Pane
              tabs={configureTabs}
              setActiveSection={(section: string) =>
                setActiveConfigure(section)
              }
              activeSection={activeConfigure}
            />
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="relative flex-1">
                <SectionTabInput placeholder="Search by Category" />
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
          <StockTable
            columns={[
              { key: "categoryId", label: "Category ID" },
              { key: "category", label: "Category" },
            ]}
            rows={[
              {
                categoryId: "#ORD-2023-1001",
                category: "FlameTech Energy",
              },
            ]}
            onView={() => {}}
            onReport={() => {}}
          />

          {/* Pagination */}
          <Pagination
            currentPage={1}
            totalPages={2}
            onPageChange={(page) => console.log("Page changed to:", page)}
            label={
              <>
                <p>Time Stock: 0</p>
              </>
            }
          />
        </div>
      )}
      <Toast />
      <AddCustomVariant
        isOpen={isAddVariantOpen}
        onClose={() => setIsAddVariantOpen(false)}
        onAddvariant={(variant: { name: string }) => {
          console.log(variant);
        }}
        variantName={variantName}
        setVariantName={setVariantName}
        handleAddVariant={handleAddVariant}
      />
    </main>
  );
};

export default Page;
