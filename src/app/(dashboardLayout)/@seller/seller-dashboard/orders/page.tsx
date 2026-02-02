import OrderStatusSelect from '@/components/seller/OrderStatusSelect';
import { medicineService } from '@/services/medicine.service'

interface Order {
  id: string;
  medicineName: string;
  medicinePrice: string;
  quantity: string;
  totalAmount: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  medicine: {
    image: string;
  };
}



export default async function SellerAnalytics() {
  const data = await medicineService.getSellerOrder()
  const orders = data.data.data
  console.log(orders);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Medicine</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: Order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={order.medicine.image}
                    alt={order.medicineName}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="font-medium">
                    {order.medicineName}
                  </span>
                </td>

                <td className="p-3">${order.medicinePrice}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3 font-semibold">
                  ${order.totalAmount}
                </td>




                <td className="p-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
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
