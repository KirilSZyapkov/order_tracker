
import { Separator } from "@/components/ui/separator";
import AddTruckForm from "./_components/addTruckForm";
import TruckShipmentCard from "./_components/truckShipmentCard";
export default function TrucksPage() {
  
  return (
    <section>
      <h2>Trucks Page</h2>
      <AddTruckForm />
      <Separator/>
      <TruckShipmentCard shipment={shipment} onClick={onClick}/>
    </section>
  )
}