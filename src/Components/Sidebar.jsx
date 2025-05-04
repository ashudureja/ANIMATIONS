import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Monitor,
  ExternalLink,
  Square,
  Loader2,
  Type,
  Star,
  Layout
} from "lucide-react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  // Use useLocation to determine active link
  const { pathname } = useLocation();
  
  const categories = [
    {
      href: "/main/svg-transitions",
      icon: Monitor,
      label: "SVG Transitions",
    },
    {
      href: "/main/page-transitions",
      icon: ExternalLink,
      label: "Page Transitions",
    },
    {
      href: "/main/buttons",
      icon: Square,
      label: "Buttons",
    },
    {
      href: "/main/cards",
      icon: Square,
      label: "Cards",
    },
    {
      href: "/main/loaders",
      icon: Loader2,
      label: "Loaders",
    },
    {
      href: "/main/text-effects",
      icon: Type,
      label: "Text Effects",
    },
    {
      href: "/main/icons",
      icon: Star,
      label: "Icons",
    },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 backdrop-blur-md shadow-sm">
      <div className="flex h-full flex-col px-4 py-6">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Layout className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            Components
          </h1>
        </div>

        <div className="mb-6 px-2">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Categories
          </h2>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-indigo-600"
                )}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-md mr-3 transition-colors",
                      isActive
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && (
                  <span
                    className="h-2 w-2 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-900/30"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-800/60 p-3 flex items-center gap-3 shadow-sm">
            <div className="h-8 w-8 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Layout className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">UI Components</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Design System</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;