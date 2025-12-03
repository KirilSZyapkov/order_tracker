"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function NavBarMenu() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div>
        <h2>Order Tracker</h2>
      </div>
      <div>
        <ul>
          <Link href="/dashboard">Dashboard</Link>
        </ul>
      </div>
      <div></div>
    </nav>
  )
}