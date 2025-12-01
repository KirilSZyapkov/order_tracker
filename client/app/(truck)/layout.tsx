import React from "react";

export default function TruckListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}