import React from "react";

export default function TruckListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex flex-col m-auto gap-5">
      {children}
    </section>
  )
}