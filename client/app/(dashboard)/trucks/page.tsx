
import { Separator } from "@/components/ui/separator";
import AddTruckForm from "./_components/addTruckForm";
import TruckList from "./_components/truckList";
export default function TrucksPage() {
  
  return (
    <section>
      <h2>Trucks Page</h2>
      <AddTruckForm />
      <Separator className="my-5"/>
      <TruckList/>
    </section>
  )
}