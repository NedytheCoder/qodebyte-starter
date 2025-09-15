"use client";

import Link from "next/link";
import {
  FiMenu,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

export default function MobileBottomNav({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}) {
  return (
    <div className="md:hidden w-full overflow-x-hidden">
      {/* Spacer to avoid overlap with content */}
      <div className="h-20" />
      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-20">
        <div className="h-16 relative">
          <div className="grid grid-cols-4 h-full text-xs text-gray-600">
            <Link
              href="#"
              className="flex flex-col items-center justify-center"
            >
              <FiBox className="mb-0.5" />
              <span>Inventory</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center justify-center"
            >
              <FiShoppingBag className="mb-0.5" />
              <span>Sales</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center justify-center"
            >
              <FiUsers className="mb-0.5" />
              <span>Customers</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center justify-center"
            >
              <FiSettings className="mb-0.5" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Center Action Button */}
          <button
            type="button"
            className="absolute -top-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center"
            aria-label="Menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
}
