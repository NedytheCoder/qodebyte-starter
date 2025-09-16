"use client";

import Toast from "@/app/components/Toast";
import { useMemo, useState } from "react";
import { RegularButton, SecondaryButton } from "../components/Button";
import { Input } from "../components/Input";
import {
  BarChart as AppBarChart,
  PieChart as AppPieChart,
} from "../components/charts";

type TimeFilter = "today" | "yesterday" | "this_week" | "this_month" | "custom";
type SectionTab = "overview" | "stock" | "sales" | "expenses" | "login";

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

const BAR_COLORS = ["#22c55e", "#ef4444"]; // income, expenses
const PIE_COLORS = ["#22c55e", "#ef4444"];

const items = [
  { name: "Income", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
  { name: "Expenses", value: 20000000 },
];

const Page = () => {
  const [activeTime, setActiveTime] = useState<TimeFilter>("today");
  const [activeSection, setActiveSection] = useState<SectionTab>("overview");
  const [customDate, setCustomDate] = useState("");
  const num = [1, 2, 3, 4, 5, 6];

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
  return (
    <main className="flex-1 w-full md:ml-64">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3 py-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="w-full md:flex md:justify-end mb-4">
            <div className="w-full md:w-auto border rounded-lg bg-white p-1">
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                {TIME_FILTERS.map((t) => (
                <button
                  key={t.key}
                  className={`px-2 py-1 md:px-4 md:py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-7">
          {/* Overview */}
          {activeSection === "overview" && (
            <>
              {num.map((n) => (
                <div
                  className="bg-white rounded-xl shadow-sm p-3 sm:p-6"
                  key={n}
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="py-2">Product</th>
                          <th className="py-2">Units Sold</th>
                          <th className="py-2">Total Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-2">12.5kg Gas Cylinder</td>
                          <td className="py-2">250</td>
                          <td className="py-2">₦1,250,000</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">6kg Gas Refill</td>
                          <td className="py-2">180</td>
                          <td className="py-2">₦540,000</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">Burner Hose</td>
                          <td className="py-2">120</td>
                          <td className="py-2">₦180,000</td>
                        </tr>
                        <tr className="border-t font-medium">
                          <td className="py-2">Total</td>
                          <td className="py-2">550</td>
                          <td className="py-2">₦1,970,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* Tabs: Section Switcher */}
        <div className="w-full mb-4">
          <div className="w-full border rounded-lg bg-white p-1">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
              {SECTION_TABS.map((t) => (
              <button
                key={t.key}
                className={`px-2 py-1 md:px-4 md:py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
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

        {/* Time Filters */}
        <div className="flex items-center justify-between mt-4">
          {activeTime === "custom" && (
            <div className="flex items-center gap-2">
              <Input
                type="date"
                label="Date"
                value={customDate}
                onChange={(e) =>
                  setCustomDate((e.target as HTMLInputElement).value)
                }
                className="!w-44"
                name="customDate"
              />
              <RegularButton label="Apply" className="!py-2 !px-4" />
            </div>
          )}
        </div>

        {/* Content by section */}
        {activeSection === "overview" && (
          <div className="mt-6 space-y-6">
            {/* Big Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Today’s Overview
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Income and Expenses Chart
              </p>
              <div className="h-72">
                <AppBarChart
                  data={barData}
                  dataKey="income"
                  xAxisKey="time"
                  showGrid
                  showLegend
                  showTooltip
                  height={"100%"}
                  width={"100%"}
                  fillColor={BAR_COLORS[0]}
                  className="h-full"
                ></AppBarChart>
              </div>
            </div>

            {/* Lower grid: Pie + two tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="text-gray-800">
                  {/* <h3 className="text-sm font-semibold">Sales By Category</h3> */}
                  <p className="text-sm font-semibold text-gray-500">
                    Revenue By Services
                  </p>
                  <p className="text-xs">Breakdown Of Revenue by services</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center mt-12 ">
                  <div className="h-64 w-1/2 min-w-[200px]">
                    <AppPieChart
                      data={pieData}
                      dataKey="value"
                      xAxisKey="name"
                      showLegend={false}
                      showTooltip
                      height={"100%"}
                      width={"100%"}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-gray-800">
                    <p>Total Revenue</p>
                    <h3 className="text-sm font-semibold mb-4">
                      $200,000,000.00
                    </h3>
                    <div className=" max-h-[15rem] overflow-y-scroll space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 text-sm"
                        >
                          <p className="w-5 h-5 bg-gray-400"></p>
                          <p>{item.name}</p> - <p>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Sales Overview */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Sales Overview</h3>
                    <span className="text-xs text-gray-500">This Month</span>
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
                      <tbody>
                        <tr className="border-t">
                          <td className="py-2">12.5kg Gas Cylinder</td>
                          <td className="py-2">250</td>
                          <td className="py-2">₦1,250,000</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">6kg Gas Refill</td>
                          <td className="py-2">180</td>
                          <td className="py-2">₦540,000</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">Burner Hose</td>
                          <td className="py-2">120</td>
                          <td className="py-2">₦180,000</td>
                        </tr>
                        <tr className="border-t font-medium">
                          <td className="py-2">Total</td>
                          <td className="py-2">550</td>
                          <td className="py-2">₦1,970,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Inventory Status */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Inventory Status</h3>
                    <RegularButton
                      label="Live Update"
                      className="!px-3 !py-1.5 !text-xs"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
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
                        <tr className="border-t">
                          <td className="py-2">6kg Gas Refill</td>
                          <td className="py-2">180</td>
                          <td className="py-2">60</td>
                          <td className="py-2">
                            <span className="text-green-600">✔</span>
                          </td>
                          <td className="py-2">120</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">12.5kg Gas Cylinder</td>
                          <td className="py-2">150</td>
                          <td className="py-2">50</td>
                          <td className="py-2">
                            <span className="text-green-600">✔</span>
                          </td>
                          <td className="py-2">100</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2">Regulator</td>
                          <td className="py-2">90</td>
                          <td className="py-2">30</td>
                          <td className="py-2">
                            <span className="text-yellow-600">Low</span>
                          </td>
                          <td className="py-2">20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Performance */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Staff Performance</h3>
                <span className="text-xs text-gray-500">This Month</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2">Staff</th>
                      <th className="py-2">Role</th>
                      <th className="py-2">Sales</th>
                      <th className="py-2">Orders</th>
                      <th className="py-2">Rating</th>
                      <th className="py-2">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2">Chinedu</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs">
                          Sales Rep
                        </span>
                      </td>
                      <td className="py-2">₦600,000</td>
                      <td className="py-2">110</td>
                      <td className="py-2">4.8 ⭐</td>
                      <td className="py-2">120 hrs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">Amaka</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs">
                          Store Manager
                        </span>
                      </td>
                      <td className="py-2">₦450,000</td>
                      <td className="py-2">85</td>
                      <td className="py-2">4.6 ⭐</td>
                      <td className="py-2">115 hrs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">Seyi</td>
                      <td className="py-2">
                        <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">
                          Delivery
                        </span>
                      </td>
                      <td className="py-2">₦300,000</td>
                      <td className="py-2">75</td>
                      <td className="py-2">4.9 ⭐</td>
                      <td className="py-2">100 hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection !== "overview" && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              <p className="text-sm">
                {SECTION_TABS.find((s) => s.key === activeSection)?.label}{" "}
                content will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
      <Toast />
    </main>
  );
};

export default Page;
