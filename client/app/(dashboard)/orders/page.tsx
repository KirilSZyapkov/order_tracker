"use client";

import OrdersList from "./_components/orderList";
import AddShipmentForm from "./_components/addShipmentForm";
import { Separator } from "@/components/ui/separator";

export default function OrdersPage() {

  return (
    <article className="px-5 py-10">
      <AddShipmentForm/>
      <Separator className="my-5"/>
      <OrdersList />
    </article>
  )
}