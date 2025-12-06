"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, List, Truck, UsersRound, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/store";

export default function NavBarMenu() {
  const [open, setOpen] = useState(false);
  const curUser = useAppStore((state)=> state.user);

  console.log(curUser);
  

  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">Order Tracker</Link>
        <div className="hidden items-center gap-6 sm:flex">
          {/* For users */}
          <Link href="/orders" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
            <List /> <span className="text-xl">Orders</span>
          </Link>
          <Link href="/trucks" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
            <Truck /> <span className="text-xl">Trucks</span>
          </Link>
          {/* For Admins */}
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
            <LayoutDashboard /> <span className="text-xl">Dashboard</span>
          </Link>
          <Link href="/users" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
            <UsersRound /> <span className="text-xl">Users</span>
          </Link>
          <SignedIn>
            <Link href={`/user/`} className="cursor-pointer">My Account</Link>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }} />
          </SignedIn>

        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 text-gray-700 hover:text-gray-400 transition-colors cursor-pointer"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden border-t border-gray-200 bg-white shadow-md"
          >
            <div className="flex flex-col space-y-4 px-4 py-4">
              <Link onClick={() => setOpen(false)} href="/orders" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
                <List /> <span className="text-xl">Orders</span>
              </Link>
              <Link onClick={() => setOpen(false)} href="/trucks" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
                <Truck /> <span className="text-xl">Trucks</span>
              </Link>
              {/* For Admins */}
              <Link onClick={() => setOpen(false)} href="/dashboard" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
                <LayoutDashboard /> <span className="text-xl">Dashboard</span>
              </Link>
              <Link onClick={() => setOpen(false)} href="/users" className="text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-2">
                <UsersRound /> <span className="text-xl">Users</span>
              </Link>

              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: { userButtonAvatarBox: "w-10 h-10" },
                  }}
                />
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}