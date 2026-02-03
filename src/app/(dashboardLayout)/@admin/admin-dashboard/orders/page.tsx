import AdminOrdersTable from "@/components/medicine/AdminOrdersTable";
import { medicineService } from "@/services/medicine.service"


export default async function OrdersForAdmin() {
  const data = await medicineService.getAllOrder()
  const medicines = data.data.data
  console.log(data.data.data);
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders : </h1>

        </div>

        <AdminOrdersTable medicines={medicines} />
      </div>
    </div>
  )
}
