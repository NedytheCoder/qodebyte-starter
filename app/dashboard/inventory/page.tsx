"use client";

import { RegularButton } from "@/app/components/Button";
import {
  Input,
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
  DonutChart as AppDonutChart,
  HorizontalBarChart as AppHorizontalBarChart,
} from "@/app/components/charts";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";
import { BsCart2 } from "react-icons/bs";
import { FaArrowDown, FaArrowRight, FaArrowUp, FaPlus } from "react-icons/fa6";
import { Select } from "radix-ui";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose, AiOutlineStock } from "react-icons/ai";
import { Pane } from "@/app/components/Tabpane";
import { DateRangeModal } from "@/app/components/DateRangeModal";
import { StockTable } from "@/app/components/Table";
import { AddCategoryModal } from "@/app/components/AddCategoryModal";
import { AddCustomVariant } from "@/app/components/AddCustomVariant";
import { BulkProductAdd } from "@/app/components/BulkProductAdd";
import { BarChart as AppBarChart } from "@/app/components/charts";
import { Bar } from "recharts";
import VariantSide from "./VariantSide";
import Configuration from "./Configuration";
import { AddOrderModal } from "@/app/components/AddOrderModal";
import { AddSupplierModal } from "@/app/components/AddSupplierModal";
import { AddAttributeModal } from "@/app/components/AddAttributeModal";
import { AddTaxModal } from "@/app/components/AddTaxModal";
import { AddDiscountModal } from "@/app/components/AddDiscountModal";
import { AddCouponModal } from "@/app/components/AddCouponModal";
import { ProductDetailsModal } from "@/app/components/ProductDetailsModal";
import { FiBox } from "react-icons/fi";
type StockTab = "all" | "purchased" | "sold" | "damaged" | "adjusted";

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
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isAddAttributeOpen, setIsAddAttributeOpen] = useState(false);
  const [isAddTaxOpen, setIsAddTaxOpen] = useState(false);
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [activeStock, setActiveStock] = useState<StockTab>("all");
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Record<
    string,
    unknown
  > | null>(null);

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
      label: "Total Inventory Units",
      value: "12,460 units",
      percent: "-3%",
      direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Total Inventory Value",
      value: "₦325,800",
      percent: "+3%",
      direction: <FaArrowUp />,
    },
    {
      icon: <BsCart2 />,
      label: "Total Sell Value",
      value: "₦590,460",
      percent: "~45%",
      direction: <FaArrowUp />,
    },
    {
      icon: <BsCart2 />,
      label: "Out of Stock",
      value: "18 SKUs",
      percent: "~45%",
      // direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Low Stock",
      value: "72 SKUs",
      percent: "~45% ",
      // direction: <FaArrowDown />,
    },
    {
      icon: <BsCart2 />,
      label: "Days of Inventory (DOI)",
      value: "12 days",
      percent: "",
      // direction: <FaArrowDown />,
    },
  ];
  const [activeSection, setActiveSection] = useState<SectionTab>("overview");
  type ConfigureTab =
    | "category"
    | "attributes"
    | "taxes"
    | "discounts"
    | "coupons";
  const [activeConfigure, setActiveConfigure] =
    useState<ConfigureTab>("category");

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

  const stock: { key: StockTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "purchased", label: "Purchased" },
    { key: "sold", label: "Sold" },
    { key: "damaged", label: "Damaged" },
    { key: "adjusted", label: "Adjusted" },
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
  const lineData = useMemo(
    () => [
      { name: "09:00", time: "09:00", Stock: 3000 },
      { name: "10:00", time: "10:00", Stock: 2500 },
      { name: "11:00", time: "11:00", Stock: 6800 },
      { name: "12:00", time: "12:00", Stock: 3200 },
      { name: "01:00", time: "01:00", Stock: 8200 },
      { name: "02:00", time: "02:00", Stock: 9800 },
    ],
    []
  );

  const pieData = useMemo(
    () => [
      { name: "Revenue", value: 20000000 },
      { name: "Expenses", value: 20000000 },
    ],
    []
  );

  // Category stock distribution data for Horizontal Bar Chart
  const categoryStockData = useMemo(
    () => [
      { name: "Clothing", value: 120 },
      { name: "Electronics", value: 80 },
      { name: "Shoes", value: 64 },
      { name: "Accessories", value: 40 },
      { name: "Home", value: 30 },
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

  const [categoriesprod, setCategoriesProd] = useState<string[]>([]);

  // New Inventory form fields
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const baseSKU = useMemo(() => {
    const p = (productName || "").trim().replace(/\s+/g, "");
    const b = (brandName || "").trim().replace(/\s+/g, "");
    const part1 = p.slice(0, 5);
    const part2 = b.slice(0, 3);
    if (part1 && part2) return `${part1}-${part2}`;
    return part1 || part2 || "";
  }, [productName, brandName]);

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

  // Render header controls based on active section
  const renderHeaderControls = () => {
    switch (activeSection) {
      case "overview":
        return (
          <Pane
            tabs={TIME_FILTERS}
            setActiveSection={(section: TimeFilter) => setActiveTime(section)}
            activeSection={activeTime}
            setShowDateModal={(show: boolean): void => {
              setShowDateModal(show);
            }}
          />
        );
      case "products":
        return !addProduct ? (
          <RegularButton
            onClick={() => setAddProduct(true)}
            label={
              <p className="text-sm flex items-center">
                <FaPlus /> Add Product
              </p>
            }
            className="text-sm"
          />
        ) : (
          <RegularButton
            onClick={() => setAddProduct(false)}
            label={
              <p className="text-sm flex items-center gap-2">
                <FaTable /> Show Table
              </p>
            }
            className="text-sm"
          />
        );
      case "configuration": {
        const labelMap: Record<ConfigureTab, string> = {
          category: "+ Add category",
          attributes: "+ Add attribute",
          taxes: "+ Add tax",
          discounts: "+ Add discount",
          coupons: "+ Add coupon",
        };
        return (
          <RegularButton
            onClick={() => {
              switch (activeConfigure) {
                case "category":
                  setIsAddCategoryOpen(true);
                  break;
                case "attributes":
                  setIsAddAttributeOpen(true);
                  break;
                case "taxes":
                  setIsAddTaxOpen(true);
                  break;
                case "discounts":
                  setIsAddDiscountOpen(true);
                  break;
                case "coupons":
                  setIsAddCouponOpen(true);
                  break;
              }
            }}
            label={<p className="text-sm">{labelMap[activeConfigure]}</p>}
            className="text-sm"
          />
        );
      }
      case "order":
        return (
          <RegularButton
            onClick={() => setIsAddOrderOpen(true)}
            label={<p className="text-sm">+ Add Order</p>}
            className="text-sm"
          />
        );
      case "stock":
        return (
          <RegularButton
            onClick={() => setIsAddSupplierOpen(true)}
            label={<p className="text-sm">+ Add supplier</p>}
            className="text-sm"
          />
        );
      case "configuration":
        return (
          <RegularButton
            onClick={() => console.log("Add configuration clicked")}
            label={<p className="text-sm">+ Add configuration</p>}
            className="text-sm"
          />
        );
      default:
        return null;
    }
  };

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
                <div className="flex gap-2 mt-2 md:mt-0 mb-6 md:mb-0 ">
                  {renderHeaderControls()}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 mt-3">
          {/* Overview */}
          {activeSection === "overview" && (
            <>
              {num.map((n, i) => (
                <div
                  className="bg-white rounded-xl shadow-sm p-3 sm:p-6 text-gray-800 flex flex-col gap-5"
                  key={n.label}
                >
                  <div>
                    <div className="border rounded-md p-2 w-fit">{n.icon}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs md:text-sm text-gray-600">
                      {n.label}
                    </p>
                    <p className="text-sm md:text-md font-semibold">
                      {n.value}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {i === 2 ? (
                      <div className="text-xs text-gray-600">
                        Marginal Potential: {n.percent}
                      </div>
                    ) : i === 3 || i === 4 || i === 5 ? (
                      <div className="flex items-center gap-1">
                        Indicator:{" "}
                        <div
                          className={`text-gray-600 ${
                            i === 3
                              ? "bg-red-400"
                              : i === 4
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          } w-4 h-4 rounded-full`}
                        ></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 border w-fit p-1 rounded-md text-green-400">
                        <p className="text-sm">{n.direction}</p>
                        <p className="text-sm">{n.percent}</p>
                      </div>
                    )}
                    <div className="text-xs text-gray-600">
                      {i < 2 && n.percent ? " vs last month" : ""}
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
                  options={[
                    { value: "all", label: "All Products" },
                    { value: "clothing", label: "Clothing" },
                    { value: "footwear", label: "Footwear" },
                    { value: "accessories", label: "Accessories" },
                  ]}
                  placeholder="Category"
                  className="w-48"
                  onChange={(value) => console.log("Category:", value)}
                />
              </div>
            </div>

            <div className="h-72">
              <AppLineChart
                data={lineData}
                dataKey="Stock"
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
                  <AppDonutChart
                    data={pieData}
                    dataKey="value"
                    xAxisKey="name"
                    showLegend={false}
                    showTooltip
                    height={"100%"}
                    width={"100%"}
                    className="h-full w-full"
                    colors={["#10B981", "#EF4444"]}
                    centerLabel="40$"
                    centerSubLabel="Profit"
                  />
                </div>
                <div className="flex flex-col gap-2 text-gray-800 w-full md:w-1/2">
                  <div className="text-gray-900 flex flex-row items-center gap-4">
                    <div>
                      {" "}
                      <p className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 rounded-lg bg-green-500"></span>
                        Revenue
                      </p>
                      <p className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 rounded-lg bg-red-500"></span>
                        Expenses
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
                    <h3 className="text-sm font-semibold">
                      Inventory by Category
                    </h3>
                    <p className="text-xs text-gray-600">
                      Distribution of stock units across product categories
                    </p>
                  </div>
                  <div className="gap-3 hidden md:flex">
                    <SelectDropdown
                      options={[
                        { value: "all", label: "Category" },
                        { value: "clothing", label: "Clothing" },
                        { value: "footwear", label: "Footwear" },
                        { value: "accessories", label: "Accessories" },
                      ]}
                      placeholder="Category"
                      className="w-48"
                      onChange={(value) => console.log("Category:", value)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="h-64 w-96 md:w-1/2 md:mt-8">
                    <AppHorizontalBarChart
                      data={categoryStockData}
                      dataKey="value"
                      xAxisKey="value"
                      yAxisKey="name"
                      xLabel="Units of stock"
                      yLabel="Category"
                      height={"100%"}
                      className="w-[80%] md:w-[190%] h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {/* Sales Overview */}
            <div className="space-y-0 md:space-y-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] text-gray-800 gap-6">
              {/* Sales Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col mb-3">
                    <h3 className="text-sm font-semibold flex gap-2">
                      <span className="text-red-500">
                        <AiOutlineStock size={20} />
                      </span>
                      Low Stock Items
                    </h3>
                    <p className="text-xs text-gray-600">
                      Products that have reached threshold
                    </p>
                  </div>
                  <div className="w-[43%]">
                    <SelectDropdown
                      options={[
                        { value: "low", label: "Low Stock" },
                        { value: "high", label: "High Stock" },
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
                <div className="overflow-x-auto">
                  <StockTable
                    rows={[{ name: "Cylinder", quantity: 250 }]}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "quantity", label: "Quantity" },
                    ]}
                    onRestock={() => {}}
                  />

                  <div>
                    <p className="text-xs flex items-center gap-1 justify-end mt-5 text-green-500">
                      View Dashboard Report <FaArrowRight size={12} />
                    </p>
                  </div>
                </div>
              </div>

              {/* Inventory Status */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 h-fit">
                <div className="flex flex-col mb-3">
                  <h3 className="text-sm font-semibold flex gap-1 items-center">
                    <span className="">
                      <FiBox size={20} />
                    </span>
                    Fast Moving Stock
                  </h3>
                  <p className="text-xs mt-1">
                    Top-selling items based on recent sales performance:
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <StockTable
                    rows={[
                      {
                        rank: 1,
                        item: "Laptop",
                        category: "Electronics",
                        units: 420,
                        stock: 10,
                        threshold: 70,
                        revenue: "4000",
                      },
                    ]}
                    columns={[
                      { key: "rank", label: "Rank" },
                      { key: "item", label: "Item/SKU" },
                      { key: "category", label: "Category" },
                      { key: "units", label: "Units Sold (Last 30 days)" },
                      { key: "stock", label: "Current Stock" },
                      { key: "threshold", label: "Threshold" },
                      { key: "revenue", label: "Revenue Generated" },
                    ]}
                  />
                  <div className="flex justify-between items-center mt-5 md:text-sm text-xs">
                    <p className="text-xs text-gray-500">
                      Last updated: Just now
                    </p>
                    <p className="text-xs flex items-center gap-1 justify-end text-green-500">
                      View Dashboard Report <FaArrowRight size={12} />
                    </p>
                  </div>
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
                  key: "item",
                  label: "Item",
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
                  key: "quantity",
                  label: "Quantity",
                },
                {
                  key: "status",
                  label: "Status",
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
                  item: "Item 1",
                  category: "Clothing",
                  brand: "Brand 1",
                  quantity: 8,
                  status: "LOW",
                  threshold: 10,
                  hasVariation: "Yes",
                },
                {
                  baseSKU: "123456",
                  item: "Item 2",
                  category: "Electronics",
                  brand: "Brand 2",
                  quantity: 10,
                  status: "Out of Stock",
                  threshold: 10,
                  hasVariation: "No",
                },
                {
                  baseSKU: "123456",
                  item: "Item 2",
                  category: "Electronics",
                  brand: "Brand 2",
                  quantity: 10,
                  status: "FULL",
                  threshold: 10,
                  hasVariation: "No",
                },
              ]}
              onView={(row) => {
                setSelectedProduct(row as Record<string, unknown>);
                setIsProductDetailsOpen(true);
              }}
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
                  className="block px-2.5 pb-2.5 pt-4 w-full text-base md:text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=" "
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                  className="block px-2.5 pb-2.5 pt-4 w-full text-base md:text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=" "
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
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
                    <Select.Trigger className="flex items-center justify-between gap-2 shadow-sm p-2.5 w-full rounded-sm text-gray-600 border border-gray-300   hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base md:text-sm">
                      <Select.Value
                        placeholder={`${
                          categoriesprod.length >= 1
                            ? "Select a category"
                            : "No categories found. Create one"
                        }`}
                      />
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
                      setCategoriesProd((prev) =>
                        prev.some(
                          (c) => c.toLowerCase() === category.name.toLowerCase()
                        )
                          ? prev
                          : [...prev, category.name]
                      );
                      setIsAddCategoryOpen(false);
                    }}
                  />
                </div>
                <div className="relative ">
                  <input
                    type="text"
                    id="unit"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-base md:text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
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
                  type="text"
                  id="threshold"
                  className="block px-2.5 pb-3 pt-3 w-full text-base md:text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer placeholder:text-[12px] mb-1"
                  placeholder="Auto-generated from product name"
                  value={baseSKU}
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
                      checked={!variantManagement}
                      onChange={() => {
                        if (categoriesprod.length === 0) {
                          toast.error("Please select a category");
                        } else {
                          setVariantManagement(!variantManagement);
                        }
                      }}
                      disabled={categoriesprod.length === 0}
                    />
                  </div>
                  {!variantManagement && (
                    <VariantSide
                      setIsAddVariantOpen={setIsAddVariantOpen}
                      variants={variants}
                      savedVariants={savedVariants}
                    />
                  )}
                </>
              )}
              {hasVariation && (
                <div className={`overflow-hidden shadow rounded-lg`}>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Variant Name
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Cost Price
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Selling Price
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Quantity
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Threshold
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 bg-white text-gray-500">
                        <tr className="hover:bg-gray-50">
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="text"
                              disabled
                              value="Auto-generated"
                              className="border border-gray-300 rounded-md p-2 w-20"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-20"
                              placeholder="Cost Price"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-20"
                              placeholder="Selling Price"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-20"
                              placeholder="Quantity"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-20"
                              value={10}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
        <div className="space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="md:text-lg text-sm font-semibold text-gray-900">
                Stock Management
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Manage your inventory and track stock levels
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div>
            <nav className="flex bg-white gap-5 md:w-fit" aria-label="Tabs">
              <Pane
                tabs={stock}
                setActiveSection={(section: StockTab): void => {
                  setActiveStock(section);
                }}
                activeSection={activeStock}
              />
            </nav>
          </div>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="relative flex-1">
                <SectionTabInput placeholder="Search by Inventory Name / Category" />
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
              { key: "date", label: "Date" },
              { key: "item", label: "Item" },
              { key: "type", label: "Type" },
              { key: "quantity", label: "Quantity" },
              { key: "addedBy", label: "Added By" },
              { key: "status", label: "Status" },
              { key: "lastupdated", label: "Last Updated" },
            ]}
            rows={[
              {
                date: "2023-06-02",
                item: "Gas Cylinder",
                type: "Purchased",
                quantity: 10,
                addedBy: "John Doe",
                status: "IN",
                lastupdated: "2 hours ago",
              },
              {
                date: "2023-06-02",
                item: "Water Bottle",
                type: "Damaged",
                quantity: 25,
                addedBy: "John Doe",
                status: "OUT",
                lastupdated: "1 day ago",
              },
              {
                date: "2023-06-02",
                item: "Water Bottle",
                type: "Sold",
                quantity: 25,
                addedBy: "John Doe",
                status: "DAMAGED",
                lastupdated: "1 day ago",
              },
            ]}
            onEdit={(row) => console.log("Edit", row)}
            onDelete={(row) => console.log("Delete", row)}
          />
        </div>
      )}

      {activeSection === "configuration" && (
        <Configuration
          activeConfigure={activeConfigure}
          onChangeConfigure={(section: string) =>
            setActiveConfigure(section as ConfigureTab)
          }
        />
      )}

      <AddOrderModal
        isOpen={isAddOrderOpen}
        onClose={() => setIsAddOrderOpen(false)}
        onAddOrder={(order) => {
          console.log("New order:", order);
          setIsAddOrderOpen(false);
        }}
      />

      <AddSupplierModal
        isOpen={isAddSupplierOpen}
        onClose={() => setIsAddSupplierOpen(false)}
        onAddSupplier={(supplier) => {
          console.log("New supplier:", supplier);
          setIsAddSupplierOpen(false);
        }}
      />

      {/* Configuration Modals */}
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAddCategory={(category) => {
          setCategoriesProd((prev) =>
            prev.some((c) => c.toLowerCase() === category.name.toLowerCase())
              ? prev
              : [...prev, category.name]
          );
          setIsAddCategoryOpen(false);
        }}
      />
      <AddAttributeModal
        isOpen={isAddAttributeOpen}
        onClose={() => setIsAddAttributeOpen(false)}
        onAddAttribute={(attribute) => {
          console.log("New attribute:", attribute);
          setIsAddAttributeOpen(false);
        }}
      />
      <AddTaxModal
        isOpen={isAddTaxOpen}
        onClose={() => setIsAddTaxOpen(false)}
        onAddTax={(tax) => {
          console.log("New tax:", tax);
          setIsAddTaxOpen(false);
        }}
      />
      <AddDiscountModal
        isOpen={isAddDiscountOpen}
        onClose={() => setIsAddDiscountOpen(false)}
        onAddDiscount={(discount) => {
          console.log("New discount:", discount);
          setIsAddDiscountOpen(false);
        }}
      />
      <AddCouponModal
        isOpen={isAddCouponOpen}
        onClose={() => setIsAddCouponOpen(false)}
        onAddCoupon={(coupon) => {
          console.log("New coupon:", coupon);
          setIsAddCouponOpen(false);
        }}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isProductDetailsOpen}
        onClose={() => {
          setIsProductDetailsOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        title="Product Details"
      />

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
