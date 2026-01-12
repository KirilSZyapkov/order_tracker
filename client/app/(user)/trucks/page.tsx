
import { Separator } from "@/components/ui/separator";
import AddTruckForm from "./_components/addTruckForm";
import TruckList from "./_components/truckList";
export default function TrucksPage() {
  
  return (
    <section className="px-5">
      <AddTruckForm />
      <Separator className="my-5"/>
      <TruckList/>
    </section>
  )
}