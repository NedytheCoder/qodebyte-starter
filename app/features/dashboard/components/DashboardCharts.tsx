'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { SecondaryButton } from '../../../components/Button';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
];

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState('revenue');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Overview</h3>
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <SecondaryButton
              onClick={() => setActiveTab('revenue')}
              className={`!px-3 !py-1 !text-sm !min-w-0 !shadow-none ${
                activeTab === 'revenue' ? '!bg-white' : '!text-gray-500 !bg-transparent'
              }`}
              label="Revenue"
            />
            <SecondaryButton
              onClick={() => setActiveTab('users')}
              className={`!px-3 !py-1 !text-sm !min-w-0 !shadow-none ${
                activeTab === 'users' ? '!bg-white' : '!text-gray-500 !bg-transparent'
              }`}
              label="Users"
            />
          </div>
        </div>
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={activeTab === 'revenue' ? 'revenue' : 'users'}
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={activeTab === 'revenue' ? 'Revenue ($)' : 'Users'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Sales Distribution</h3>
          <div className="flex items-center text-sm text-gray-500">
            <FiBarChart2 className="mr-1" />
            <span>This Month</span>
          </div>
        </div>
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <SecondaryButton 
            className="!px-0 !py-0 !text-sm !text-indigo-600 hover:!text-indigo-800 !bg-transparent !border-0 !shadow-none"
            label="View All"
          />
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <FiTrendingUp />
              </div>
              <div className="flex-1">
                <p className="font-medium">New order received</p>
                <p className="text-sm text-gray-500">Order #{1000 + item} has been placed</p>
              </div>
              <span className="text-sm text-gray-400">{item}h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
