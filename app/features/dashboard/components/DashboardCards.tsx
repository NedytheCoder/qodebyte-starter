'use client';

import { FiDollarSign, FiUsers, FiShoppingCart, FiActivity } from 'react-icons/fi';

type CardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
};

const StatCard = ({ title, value, change, isPositive, icon, color }: CardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 md:p-6 flex-1 min-w-0">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm mt-2 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {change}
          <span className="text-gray-500 ml-1">vs last month</span>
        </p>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function DashboardCards() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      isPositive: true,
      icon: <FiDollarSign className="text-2xl text-purple-600" />,
      color: 'bg-purple-100',
    },
    {
      title: 'Customers',
      value: '2,345',
      change: '+12.3%',
      isPositive: true,
      icon: <FiUsers className="text-2xl text-blue-600" />,
      color: 'bg-blue-100',
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+4.5%',
      isPositive: true,
      icon: <FiShoppingCart className="text-2xl text-green-600" />,
      color: 'bg-green-100',
    },
    {
      title: 'Active Now',
      value: '573',
      change: '-2.1%',
      isPositive: false,
      icon: <FiActivity className="text-2xl text-orange-600" />,
      color: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
