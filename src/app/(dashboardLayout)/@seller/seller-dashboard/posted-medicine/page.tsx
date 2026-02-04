import DeleteMedicineButton from "@/components/medicine/DeleteMedicineButton";
import { medicineService } from "@/services/medicine.service"
import { Trash, Upload } from "lucide-react";


interface Order {
  id: string;
  name: string;
  image:string;
  price: number;
  stock: number;
  status: string;
  isFeatured: boolean;
  createdAt: string;
}

export default async function PostedMedicine() {
  const data = await medicineService.getMyPostedMedicine()
  const orders = data?.data.data.result

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Posted Medicine</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Medicine</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>

              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order:Order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={order?.image}
                    alt={order?.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="font-medium">
                    {order?.name}
                  </span>
                </td>

                <td className="p-3">${order?.price}</td>
                <td className="p-3">{order?.stock}</td>


                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.isFeatured === true
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.isFeatured ? "Featured" : "Not Featured"}
                  </span>
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="text-red-500 flex gap-4 cursor-pointer">
                  
                   <DeleteMedicineButton
                    id={order.id}
                    name={order.name}
                  />
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}
