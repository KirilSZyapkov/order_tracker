"use client";

import { useState } from "react";
import { useAppStore } from "@/store/store";
import { trpc } from "@/utils/trpc";

import OrdersList from "./_components/orderList";

export default function OrdersPage() {

  return (
    <article className="px-5">
      <h1>Orders page</h1>
      <OrdersList />
    </article>
  )
}