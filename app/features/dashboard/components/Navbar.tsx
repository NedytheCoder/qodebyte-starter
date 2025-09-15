"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiChevronDown,
  FiX,
  FiGitBranch,
} from "react-icons/fi";
import { RegularButton } from "../../../components/Button";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileSearch(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle mobile search
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-1">
      <div className="mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <p className="md:hidden w-full text-sm text-gray-500 leading-6">
              <strong>Good Morning Admin</strong>
            </p>
            {/* Welcome Message - Hidden on mobile */}
            <div className="hidden md:block ml-4 pl-56">
              <p className="text-sm text-gray-500 leading-6">
                <strong>Good Morning Admin</strong>
                <br /> Welcome back, nice to see you again!
              </p>
            </div>
          </div>

          {/* Right side - Icons and profile */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}

            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
              aria-label="View notifications"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Branches Button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="View branches"
            >
              <FiGitBranch className="h-5 w-5" />
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3" ref={profileRef}>
              <div>
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    AD
                  </div>
                  <span className="hidden md:inline-block ml-2 text-sm font-medium text-gray-700">
                    Admin User
                  </span>
                  <FiChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>

              {/* Dropdown menu */}
              {isProfileOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {/* {showMobileSearch && (
          <div className="pb-3 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search..."
                autoFocus
              />
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
}
