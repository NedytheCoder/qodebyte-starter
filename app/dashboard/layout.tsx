"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-x-hidden"
      onClick={() => {
        if (navOpen) setNavOpen(!navOpen);
      }}
    >
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="pt-16 md:pt-28">
        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`md:block w-64 fixed ${
              !navOpen ? "-left-full" : "left-0"
            } md:left-0 border-r bg-white z-10 transition-all duration-400 ease-in-out`}
          >
            <Sidebar />
          </aside>

          {/* Main */}
          {children}
        </div>
      </div>
      {/* Mobile bottom navigation */}
      <MobileBottomNav navOpen={navOpen} setNavOpen={setNavOpen} />
    </div>
  );
}
