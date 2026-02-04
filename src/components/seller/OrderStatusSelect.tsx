"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/(dashboardLayout)/@seller/seller-dashboard/orders/actions";
import { toast } from "sonner";

const STATUSES = [
    "PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];

export default function OrderStatusSelect({
    orderId,
    currentStatus,
}: {
    orderId: string;
    currentStatus: string;
}) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;

        startTransition(async () => {
            const loadingToast = toast.loading("Updating order status...");
            try {
                await updateOrderStatus(orderId, newStatus);
                toast.success("Order status updated successfully", {
                    id: loadingToast,
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to update order status", {
                    id: loadingToast,
                });
            }
        });
    };

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className="px-3 py-1 rounded-lg border bg-white text-sm font-medium disabled:opacity-60"
        >
            {STATUSES?.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}
