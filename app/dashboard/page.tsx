"use client";

import Toast from "@/app/components/Toast";
import { useMemo, useState } from "react";
import { DateRangeModal } from "../components/DateRangeModal";
import { SectionTabInput, SelectDropdown } from "../components/Input";
import {
  BarChart as AppBarChart,
  PieChart as AppPieChart,
} from "../components/charts";
import { Bar } from "recharts";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { StockTable } from "../components/Table";
import { Pagination } from "../components/Pagination";
import { Pane } from "../components/Tabpane";

type TimeFilter = "today" | "yesterday" | "this_week" | "this_month" | "custom";
type SectionTab = "overview" | "stock" | "sales" | "expenses" | "login";
type StockTab = "all" | "purchased" | "sold" | "damaged" | "adjusted";
type SaleFilter = "all" | "walk" | "online";
type LoginFilter = "all" | "success" | "failed";

const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "custom", label: "Custom Date" },
];

const SECTION_TABS: { key: SectionTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "stock", label: "Stock Movement" },
  { key: "sales", label: "Sales" },
  { key: "expenses", label: "Expenses" },
  { key: "login", label: "Login Attempts" },
];

const saleTabs: { key: SaleFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "walk", label: "Walk In" },
  { key: "online", label: "Online" },
];

const loginTabs: { key: LoginFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "success", label: "Success" },
  { key: "failed", label: "Failed" },
];

const Page = () => {
  const [activeTime, setActiveTime] = useState<TimeFilter>("today");
  const [activeSection, setActiveSection] = useState<SectionTab>("overview");
  const [activeStock, setActiveStock] = useState<StockTab>("all");
  const [showDateModal, setShowDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSale, setActiveSale] = useState<SaleFilter>("all");
  const [activeLogin, setActiveLogin] = useState<LoginFilter>("all");

  const stock: { key: StockTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "purchased", label: "Purchased" },
    { key: "sold", label: "Sold" },
    { key: "damaged", label: "Damaged" },
    { key: "adjusted", label: "Adjusted" },
  ];

  const num = [
    {
      icon: <TbCurrencyNaira />,
      label: "Gros Income",
      value: "₦1,000",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Total Discount",
      value: "₦14,000.00",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Net Income",
      value: "₦3,200.00",
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Inventry Count",
      value: 24,
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Staff on duty",
      value: 10,
      percent: 0,
      direction: <FaArrowUp />,
    },
    {
      icon: <TbCurrencyNaira />,
      label: "Total orders",
      value: 24,
      percent: 0,
      direction: <FaArrowUp />,
    },
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
      { name: "Income", value: 10000000 },
      { name: "Expenses", value: 20000000 },
    ],
    []
  );

  const stockData = useMemo(
    () => [
      {
        id: 1,
        name: "12.5kg Gas Cylinder",
        category: "Gas",
        stock: 45,
        status: "Low Stock",
        lastUpdated: "2 hours ago",
      },
      {
        id: 2,
        name: "12.5kg Gas Cylinder",
        category: "Gas",
        stock: 45,
        status: "Low Stock",
        lastUpdated: "2 hours ago",
      },
      // ... more stock items
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(stockData.length / 5),
    [stockData]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main className="flex-1 w-full md:ml-64">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between my-2 gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className={`w-full md:flex md:justify-end mb-4`}>
            <div className="w-full md:w-auto border rounded-lg">
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex gap-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-7">
          {/* Overview */}
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
        {/* Tabs: Section Switcher */}
        <div className="w-full mb-4">
          <Pane
            tabs={SECTION_TABS}
            setActiveSection={(section: SectionTab) =>
              setActiveSection(section)
            }
            activeSection={activeSection}
            mainPane={true}
          />
        </div>

        {/* Date Range Modal */}
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

        {/* Content by section */}
        {activeSection === "overview" && (
          <div className="">
            {/* Big Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden md:mb-7 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Today’s Overview
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Income and Expenses Chart
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

            {/* Lower grid: Pie + two tables */}
            <div className="md:mb-7 mb-4">
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
                <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                  <div className="h-64 w-full md:w-2/3">
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
                  <div className="flex flex-col gap-2 text-gray-800 w-full md:w-1/3">
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
            </div>
            {/* Sales overview */}
            <div className="space-y-0 md:space-y-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] text-gray-800 gap-4">
              {/* Sales Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold flex gap-2">
                    <span className="text-green-500">
                      <AiOutlineStock size={20} />
                    </span>
                    Top Selling Products
                  </h3>
                  <span className="text-xs text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    This Month
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-xs md:text-sm text-left text-gray-500">
                        <th className="py-2">Product</th>
                        <th className="py-2">Units Sold</th>
                        <th className="py-2">Total Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-xs md:text-sm">
                        <td className="py-2">12.5kg Gas Cylinder</td>
                        <td className="py-2">250</td>
                        <td className="py-2">₦1,250,000</td>
                      </tr>
                      <tr className="text-xs md:text-sm">
                        <td className="py-2">6kg Gas Refill</td>
                        <td className="py-2">180</td>
                        <td className="py-2">₦540,000</td>
                      </tr>
                      <tr className="text-xs md:text-sm">
                        <td className="py-2">Burner Hose</td>
                        <td className="py-2">120</td>
                        <td className="py-2">₦180,000</td>
                      </tr>
                      <tr className="text-xs md:text-sm font-medium">
                        <td className="py-2">Total</td>
                        <td className="py-2">550</td>
                        <td className="py-2">₦1,970,000</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <p className="text-xs md:text-sm flex items-center gap-1 justify-end mt-2 text-green-500">
                      View Dashboard Report <FaArrowRight size={12} />
                    </p>
                  </div>
                </div>
              </div>

              {/* Inventory Status */}
              <div className="bg-white rounded-xl md:h-72 shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold flex gap-1 items-center">
                    <span className="text-green-500">
                      <FiBox size={20} />
                    </span>
                    Most Ordered Items
                  </h3>
                  <p className="text-xs text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    Live Updates
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full md:text-sm text-xs">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="py-2">Item</th>
                        <th className="py-2">Orders</th>
                        <th className="py-2">Repeat</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        <td className="py-2">6kg Gas Refill</td>
                        <td className="py-2">180</td>
                        <td className="py-2">60</td>
                        <td className="py-2">
                          <span className="text-green-600">✔</span>
                        </td>
                        <td className="py-2">
                          <div className="w-[90%] bg-gray-200 rounded-full h-3">
                            <div className="bg-green-600 h-3 rounded-full w-[70%]"></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2">12.5kg Gas Cylinder</td>
                        <td className="py-2">150</td>
                        <td className="py-2">50</td>
                        <td className="py-2">
                          <span className="text-green-600">✔</span>
                        </td>
                        <td className="py-2">
                          <div className="w-[90%] bg-gray-200 rounded-full h-3">
                            <div className="bg-green-600 h-3 rounded-full w-[50%]"></div>
                          </div>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2">Regulator</td>
                        <td className="py-2">90</td>
                        <td className="py-2">30</td>
                        <td className="py-2">
                          <span className="text-yellow-600">Low</span>
                        </td>
                        <td className="py-2">
                          <div className="w-[90%] bg-gray-200 rounded-full h-3">
                            <div className="bg-amber-600 h-3 rounded-full w-[20%]"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center mt-5 md:text-sm text-xs">
                    <p className="text-xs text-gray-500">
                      Last updated: Just now
                    </p>
                    <p className="text-xs flex items-center gap-1 justify-end md:mt-2 text-green-500">
                      View Dashboard Report <FaArrowRight size={12} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Performance */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mt-4 md:mt-0 text-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-green-500">
                    <MdGroups size={20} />
                  </span>
                  Staff Performance
                </h3>
                <span className="text-xs text-green-500 bg-green-50 px-3 py-1 rounded-full">
                  This Month
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                          Staff
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                          Sales
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                          Orders
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                          Rating
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                          Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Chinedu
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Sales Rep
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦600,000
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          110
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          4.8 ⭐
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          120 hrs
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Amaka
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Store Manager
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦450,000
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          85
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          4.6 ⭐
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          115 hrs
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Seyi
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Delivery
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦300,000
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          75
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          4.9 ⭐
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          100 hrs
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "stock" && (
          <div className="space-y-6">
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
              <nav className="flex bg-white gap-5 w-fit" aria-label="Tabs">
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

        {activeSection === "sales" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="md:text-lg text-sm font-semibold text-gray-900">
                  Sales
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  All pending, processing, in transit and canceled orders.
                </p>
              </div>
            </div>
            {/* Category Tabs */}
            <div className="">
              <nav className="flex bg-white gap-5 w-fit" aria-label="Tabs">
                <Pane
                  tabs={saleTabs}
                  setActiveSection={(section: SaleFilter) =>
                    setActiveSale(section)
                  }
                  activeSection={activeSale}
                />
              </nav>
              <StockTable
                columns={[
                  { key: "invoiceNo", label: "Invoice No." },
                  { key: "salesDate", label: "Sales Date" },
                  { key: "customer", label: "Customer" },
                  { key: "totalAmount", label: "Total Amount" },
                  { key: "salesMethod", label: "Sales Method" },
                  { key: "salesPerson", label: "Sales Person" },
                ]}
                rows={[
                  {
                    invoiceNo: "INV-001",
                    salesDate: "2023-06-02",
                    customer: "Qodebyte",
                    totalAmount: 250,
                    salesMethod: "Online",
                    salesPerson: "John Doe",
                  },
                  {
                    invoiceNo: "INV-002",
                    salesDate: "2023-06-02",
                    customer: "Qodebyte",
                    totalAmount: 250,
                    salesMethod: "Walk In",
                    salesPerson: "Jane Doe",
                  },
                  {
                    invoiceNo: "INV-003",
                    salesDate: "2023-06-02",
                    customer: "Qodebyte",
                    totalAmount: 250,
                    salesMethod: "Online",
                    salesPerson: "Jane Doe",
                  },
                ]}
                onView={(row) => console.log("View", row)}
                onDelete={(row) => console.log("Delete", row)}
                className="mt-3"
              />
            </div>
          </div>
        )}

        {activeSection === "login" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="md:text-lg text-sm font-semibold text-gray-900">
                  Login Attempts
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  View a record of recent login attempts to monitor account
                  access
                </p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="">
              <nav className="flex bg-white gap-5 w-fit" aria-label="Tabs">
                <Pane
                  tabs={loginTabs}
                  setActiveSection={(section: LoginFilter) =>
                    setActiveLogin(section)
                  }
                  activeSection={activeLogin}
                />
              </nav>
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
            <div className="overflow-hidden shadow rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
                  <thead className="bg-gray-50">
                    <tr className="hidden sm:table-row">
                      <th className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">
                        Date & Time
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Device
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        IP Address
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Location
                      </th>
                      <th className="px-3 py-3.5 text-left font-semibold text-gray-900">
                        Status
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
                        device: { type: "Laptop", os: "Windows 11" },
                        ipAddress: "192.168.1.1",
                        timestamp: "2023-11-15T09:30:00",
                        location: "Enugu, Nigeria",
                        status: "success",
                        statusText: "Successful",
                      },
                      {
                        id: 2,
                        device: { type: "Mobile", os: "iOS 16" },
                        ipAddress: "192.168.1.15",
                        timestamp: "2023-11-15T12:45:22",
                        location: "Lagos, Nigeria",
                        status: "success",
                        statusText: "Successful",
                      },
                      {
                        id: 3,
                        device: { type: "Tablet", os: "Android 13" },
                        ipAddress: "192.168.1.27",
                        timestamp: "2023-11-14T15:20:10",
                        location: "Abuja, Nigeria",
                        status: "failed",
                        statusText: "Failed - Wrong Password",
                      },
                      {
                        id: 4,
                        device: { type: "Desktop", os: "Windows 10" },
                        ipAddress: "192.168.1.34",
                        timestamp: "2023-11-14T08:12:45",
                        location: "Port Harcourt, Nigeria",
                        status: "success",
                        statusText: "Successful",
                      },
                      {
                        id: 5,
                        device: { type: "Mobile", os: "Android 12" },
                        ipAddress: "192.168.1.42",
                        timestamp: "2023-11-13T18:30:15",
                        location: "Kano, Nigeria",
                        status: "failed",
                        statusText: "Failed - Invalid Credentials",
                      },
                    ]
                      .sort(
                        (a, b) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime()
                      )
                      .map((item) => {
                        const date = new Date(item.timestamp);
                        const formattedDate = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                        const formattedTime = date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            {/* Date & Time */}
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6">
                              <div className="sm:hidden mb-1 font-semibold">
                                Date & Time
                              </div>
                              <div className="flex flex-col">
                                <span>{formattedDate}</span>
                                <span className="text-xs text-gray-500">
                                  {formattedTime}
                                </span>
                              </div>
                            </td>

                            {/* Device */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                Device
                              </div>
                              <div className="flex items-center">
                                {/* <div className="h-8 w-8 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                                  {item.device.type === "Mobile" ? (
                                    <svg
                                      className="h-4 w-4 text-gray-500"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z" />
                                    </svg>
                                  ) : item.device.type === "Tablet" ? (
                                    <svg
                                      className="h-4 w-4 text-gray-500"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="h-4 w-4 text-gray-500"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                                    </svg>
                                  )}
                                </div> */}
                                <div className="ml-3">
                                  <div className="font-medium text-gray-900">
                                    {item.device.type}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.device.os}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* IP Address */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                IP Address
                              </div>
                              <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono">
                                {item.ipAddress}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                              <div className="sm:hidden mb-1 font-semibold">
                                Location
                              </div>
                              <div className="flex items-center">
                                {/* <svg
                                  className="h-4 w-4 text-gray-400 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg> */}
                                {item.location}
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
                                {item.status === "success" ? (
                                  <svg
                                    className="-ml-0.5 mr-1.5 h-2 w-2 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 8 8"
                                  >
                                    <circle cx={4} cy={4} r={3} />
                                  </svg>
                                ) : (
                                  <svg
                                    className="-ml-0.5 mr-1.5 h-2 w-2 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 8 8"
                                  >
                                    <circle cx={4} cy={4} r={3} />
                                  </svg>
                                )}
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
            <Pagination
              currentPage={1}
              totalPages={2}
              onPageChange={(page) => console.log("Page:", page)}
            />
          </div>
        )}

        {activeSection === "expenses" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="md:text-lg text-sm font-semibold text-gray-900">
                  Expenses Record
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Manage all your business expenses
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <SectionTabInput placeholder="Search by Order Name / ID" />
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
                  placeholder="Filter by category"
                  className="w-48"
                  onChange={(value) => console.log("Category:", value)}
                />
              </div>
            </div>

            {/* Expenses Table */}
            <div className="overflow-hidden shadow rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: 1,
                        name: "Maintenance",
                        description: "Pump Maintenance",
                        date: "2023-01-01",
                        formattedDate: "Jan 1, 2023",
                        addedBy: "John Doe",
                        amount: 150.75,
                        lastUpdated: "2 hours ago",
                      },
                      {
                        id: 2,
                        name: "Utilities",
                        description: "Electricity Bill",
                        date: "2023-01-05",
                        formattedDate: "Jan 5, 2023",
                        addedBy: "Jane Smith",
                        amount: 289.5,
                        lastUpdated: "1 day ago",
                      },
                      {
                        id: 3,
                        name: "Office Supplies",
                        description: "Printer paper and ink",
                        date: "2023-01-10",
                        formattedDate: "Jan 10, 2023",
                        addedBy: "Mike Johnson",
                        amount: 87.25,
                        lastUpdated: "3 days ago",
                      },
                    ].map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div
                              className={`h-3 w-3 rounded-full mr-3 ${
                                expense.name === "Maintenance"
                                  ? "bg-yellow-400"
                                  : expense.name === "Utilities"
                                  ? "bg-blue-400"
                                  : "bg-green-400"
                              }`}
                            ></div> */}
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {expense.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {expense.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            Added by {expense.addedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {expense.formattedDate}
                          </div>
                          <div className="text-xs text-gray-500">
                            {expense.lastUpdated}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-sm font-medium text-gray-900">
                            ${expense.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-3 text-sm font-medium text-gray-900"
                      >
                        Total
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        $527.50
                      </td>
                      <td className="px-6 py-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalPages={2}
              onPageChange={(page) => console.log("Page:", page)}
            />
          </div>
        )}
      </div>
      <Toast />
    </main>
  );
};

export default Page;
