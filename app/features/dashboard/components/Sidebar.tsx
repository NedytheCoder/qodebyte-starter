"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiSearch,
} from "react-icons/fi";

interface SidebarProps {
  onClose?: () => void;
}

import logo from "@/public/image.png";
import Image from "next/image";

const navItems = [
  {
    name: "Dashboard",
    icon: <FiHome size={20} />,
    path: "/features/dashboard",
    exact: true,
  },
  {
    name: "Analytics",
    icon: <FiPieChart size={20} />,
    path: "/features/dashboard/analytics",
    exact: false,
  },
  {
    name: "Customers",
    icon: <FiUsers size={20} />,
    path: "/features/dashboard/customers",
    exact: false,
  },
  {
    name: "Products",
    icon: <FiShoppingBag size={20} />,
    path: "/features/dashboard/products",
    exact: false,
  },
  {
    name: "Settings",
    icon: <FiSettings size={20} />,
    path: "/features/dashboard/settings",
    exact: false,
  },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname() || "";

  const isActive = (itemPath: string, exact: boolean) => {
    if (!pathname) return false;

    const currentPath = pathname.replace(/\/$/, "").toLowerCase();
    const normalizedItemPath = itemPath.replace(/\/$/, "").toLowerCase();

    if (exact) {
      return currentPath === normalizedItemPath;
    }

    return (
      currentPath === normalizedItemPath ||
      currentPath.startsWith(`${normalizedItemPath}/`)
    );
  };

  const handleItemClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="h-screen flex flex-col bg-white fixed top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact || false);
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={handleItemClick}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span
                    className={`mr-3 ${
                      active ? "text-indigo-500" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">AD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
