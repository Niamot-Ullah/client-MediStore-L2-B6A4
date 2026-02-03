"use client";

import { useTransition } from "react";

import { toast } from "sonner";
import { updateUserStatus } from "@/actions/UpdateUserStatus";

const STATUSES = [
    "ACTIVE",
    "SUSPENDED",
];

export default function UserStatusSelect({
    userId,
    currentStatus,
}: {
    userId: string;
    currentStatus: string;
}) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;

        startTransition(async () => {
            const loadingToast = toast.loading("Updating User status...");
            try {
                await updateUserStatus(userId, newStatus);
                toast.success("User status updated successfully", {
                    id: loadingToast,
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to update user status", {
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
            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}
