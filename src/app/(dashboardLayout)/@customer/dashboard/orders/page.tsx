"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import LoadingEmoji from "@/components/ui/LoadingEmoji";
import { Trash } from "lucide-react";
import { toast } from "sonner";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Dialog state
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const res = await orderService.getMyOrder();

      if (res?.error) {
        setError("Failed to load orders");
      } else {
        setOrders(res.data.data);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        <LoadingEmoji />
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="p-6 text-gray-500">No orders found.</p>;
  }

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "CANCELLED" }
          : order
      )
    );

    setOpen(false);

    const res = await orderService.cancelOrder(selectedOrder.id);

    if (res?.error) {
      toast.error("Failed to cancel order. Please try again.");


      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "PLACED" }
            : order
        )
      );
    }

    setSelectedOrder(null);
  };

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
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
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

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === "PLACED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  {order.status === "PLACED" && (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Cancel order"
                    >
                      <Trash size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel{" "}
              <b>{selectedOrder?.medicineName}</b>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              No, keep it
            </Button>

            <Button
              variant="destructive"
              onClick={confirmCancelOrder}
            >
              Yes, cancel order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
