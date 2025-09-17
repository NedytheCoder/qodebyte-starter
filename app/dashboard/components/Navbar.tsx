"use client";

import { Searchbar } from "@/app/components/Input";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FiBell, FiChevronDown, FiGitBranch } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

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
  // const toggleMobileSearch = () => {
  //   setShowMobileSearch(!showMobileSearch);
  // };

  const links = [
    { label: "Your Profile", icon: <FaRegCircleUser /> },
    { label: "Settings", icon: <FiSettings /> },
    { label: "Help and Support", icon: <FaRegCircleQuestion /> },
    { label: "Sign out", icon: <PiSignOut /> },
  ];

  return (
    <nav className="fixed top-0 left-0 md:left-72 md:right-9 right-0 bg-white z-1 shadow-sm rounded">
      <div className="mx-auto px-4 lg:px-6 py-4 md:py-7">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="md:hidden w-full text-sm text-gray-500 leading-6">
              <strong>Good Morning Admin</strong>
            </p>
            {/* Welcome Message - Hidden on mobile */}
            <div className="hidden md:block">
              <p className="text-sm text-gray-500 leading-6">
                <span className="font-semibold">Good Morning Admin</span>
                <br />{" "}
                <span className="text-xs">
                  Welcome back, nice to see you again!
                </span>
              </p>
            </div>
          </div>

          <form className="relative hidden md:block" onSubmit={handleSearch}>
            <input
              placeholder="Search..."
              className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-64 transition-all focus:w-72 outline-none placeholder:text-gray-400"
              name="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="size-6 absolute top-3 right-3 text-gray-500"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </form>

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
                  className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white focus:outline-none z-50 py-3"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <div className="flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="img w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="info">
                      <p className="font-semibold">Qodebyte</p>
                      <p className="text-xs text-gray-400">Admin User</p>
                    </div>
                  </div>
                  {links.map((link) => (
                    <Link
                      href="#"
                      className={`flex items-center gap-2 px-6 py-2 text-sm text-gray-700 group ${
                        link.label === "Sign out"
                          ? "text-red-500 hover:bg-red-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={(e) => e.preventDefault()}
                      role="menuitem"
                      tabIndex={-1}
                      key={link.label}
                    >
                      <span
                        className={` ${
                          link.label === "Sign out"
                            ? ""
                            : "group-hover:text-blue-400"
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
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
