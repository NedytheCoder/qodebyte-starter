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
import { FaTable } from "react-icons/fa";
import {
  BarChart as AppBarChart,
  LineChart as AppLineChart,
  PieChart as AppPieChart,
} from "@/app/components/charts";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";

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

  const num = [1, 2, 3, 4, 5, 6];
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Inventory</h1>
          </div>
          <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="inline-flex gap-2 border rounded-lg bg-white p-1 mt-2">
              {TIME_FILTERS.map((t) => (
                <button
                  key={t.key}
                  className={`px-2 py-1 md:px-4 md:py-2 text-sm rounded-md whitespace-nowrap transition-colors hidden md:block ${
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
            {activeSection === "products" && addProduct && (
              <RegularButton
                label={
                  <>
                    <p className="flex items-center p-2 gap-2">
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
                    <p className="flex items-center p-2 gap-2">
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
                    <p className="flex items-center p-2 gap-2">
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

        {/* Lower grid: Pie + two tables */}
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
        <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="inline-flex gap-2 border rounded-lg bg-white p-1 w-full">
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
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Sales By Category</h3>
                  <p className="text-xs text-gray-500">
                    Breakdown Of Sales by Product Category
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Today’s Revenue</p>
                  <p className="font-semibold">₦20,000,000.00</p>
                </div>
              </div>
              <div className="h-64">
                <AppPieChart
                  data={pieData}
                  dataKey="value"
                  xAxisKey="name"
                  showLegend
                  showTooltip
                  height={"100%"}
                  width={"100%"}
                  className="h-full"
                />
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
        </div>
      )}

      {activeSection === "products" && !addProduct && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          {/* Big Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900">
            <h3 className="text-md font-semibold mb-2">Stock Investment</h3>
            <p className="text-sm">
              Monitor the flow of your inventory in and out of the storage
            </p>

            <Searchbar
              className="pr-12"
              placeholder="Search inventory name..."
            />

            <Table
              columns={[
                { header: "Base SKU", accessor: "base_sku" },
                { header: "Product Name", accessor: "product_name" },
                { header: "Category", accessor: "category" },
                { header: "Brand", accessor: "brand" },
                { header: "Threshold", accessor: "threshold" },
                { header: "hasVariation", accessor: "hasVariation" },
              ]}
              data={[
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
              ]}
            />

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

      {activeSection === "products" && addProduct && (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="flex flex-col gap-3 w-full md:w-2/3">
              <p className="text-gray-600 mt-2">New Inventory Item</p>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 mt-3">
                <Input placeholder="Product Name" />
                <Input placeholder="Brand" />
                <div className="flex gap-3 w-full">
                  {/* <Input placeholder="Category" className="w-1/2" /> */}
                  <SelectDropdown
                    options={[
                      { value: "Category 1", label: "Category 1" },
                      { value: "Category 2", label: "Category 2" },
                      { value: "Category 3", label: "Category 3" },
                    ]}
                    onChange={(value: string) => {
                      // Handle category selection here
                      console.log("Selected category:", value);
                    }}
                    label={"Category"}
                    className="w-full"
                  />
                  <Input placeholder="Unit" className="w-1/2" />
                </div>
                <Input placeholder="Threshold" />
                <Input placeholder="hasVariation" />
              </div>
            </div>
            <div className="text-gray-600 w-full md:w-1/3">
              <div className="flex justify-end gap-3">
                <RegularButton
                  label="Bulk Product Add"
                  className="!bg-transparent !text-gray-600 !border !border-gray-600"
                  onClick={() => setBulkProduct(true)}
                />
                <RegularButton label="Save & Publish" />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900 mt-3">
                <div className="flex items-center justify-between">
                  <p>Variant Management</p>
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
            <p className="text-sm">
              Track and manage product orders, including status, quantity and
              customer details
            </p>

            <div className="flex items-center gap-2 my-4">
              {ORDER_FILTERS.map((f) => (
                <SecondaryButton
                  key={f.key}
                  label={f.label}
                  onClick={() => setActiveOrder(f.key)}
                  className={`!px-2 !py-1 !text-sm !min-w-0 !shadow-none md:px-3 md:py-2 ${
                    activeOrder === f.key
                      ? "!bg-gray-900 !text-white"
                      : "!bg-white !text-gray-700 border !border-gray-200"
                  }`}
                />
              ))}
            </div>

            <Searchbar
              className="pr-12"
              placeholder="Search inventory name..."
            />

            <Table
              columns={[
                { header: "Base SKU", accessor: "base_sku" },
                { header: "Product Name", accessor: "product_name" },
                { header: "Category", accessor: "category" },
                { header: "Brand", accessor: "brand" },
                { header: "Threshold", accessor: "threshold" },
                { header: "hasVariation", accessor: "hasVariation" },
              ]}
              data={[
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
              ]}
            />

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
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-hidden text-gray-900">
            <h3 className="text-md font-semibold mb-2">Stocks</h3>
            <p className="text-sm">
              Monitor the flow of your inventory in and out of the storage
            </p>

            <div className="flex items-center gap-2 my-4">
              {ORDER_FILTERS.map((f) => (
                <SecondaryButton
                  key={f.key}
                  label={f.label}
                  onClick={() => setActiveOrder(f.key)}
                  className={`!px-2 !py-1 !text-sm !min-w-0 !shadow-none md:px-3 md:py-2 ${
                    activeOrder === f.key
                      ? "!bg-gray-900 !text-white"
                      : "!bg-white !text-gray-700 border !border-gray-200"
                  }`}
                />
              ))}
            </div>

            <Searchbar
              className="pr-12"
              placeholder="Search inventory name..."
            />

            <Table
              columns={[
                { header: "Base SKU", accessor: "base_sku" },
                { header: "Product Name", accessor: "product_name" },
                { header: "Category", accessor: "category" },
                { header: "Brand", accessor: "brand" },
                { header: "Threshold", accessor: "threshold" },
                { header: "hasVariation", accessor: "hasVariation" },
              ]}
              data={[
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
                {
                  base_sku: "123",
                  product_name: "Product 1",
                  category: "Category 1",
                  brand: "Brand 1",
                  threshold: 10,
                  hasVariation: true,
                },
              ]}
            />

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
