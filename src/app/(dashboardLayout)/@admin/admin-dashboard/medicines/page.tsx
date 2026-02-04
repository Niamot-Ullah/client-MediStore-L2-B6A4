import AdminMedicinesTable from "@/components/medicine/AdminMedicines"
import { medicineService } from "@/services/medicine.service"
// import { AdminMedicinesTable } from '@/components/medicine/AdminMedicinesTable';


export default async function AdminMedicines() {
  const data = await medicineService.getAllMedicinesForAdmin()
  // console.log(data);
  const medicines = data?.data.data

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Medicine Inventory</h1>
          
        </div>
        
        <AdminMedicinesTable medicines={medicines} />
      </div>
    </div>
  )
}
