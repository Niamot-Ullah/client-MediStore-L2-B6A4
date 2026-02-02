
"use client";

import { useState, useTransition } from "react";
import { Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteMedicineAction } from "@/actions/deleteMedicineAction";
import { toast } from "sonner";

export default function DeleteMedicineButton({
    id,
    name,
}: {
    id: string;
    name: string;
}) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteMedicineAction(id);
                setOpen(false);
                toast.success(`${name} deleted successfully!`);
            } catch (err: any) {
                toast.error(err?.message || "Failed to delete medicine");
            }
        });
    };

    return (
        <>
            <Trash
                size={22}
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => setOpen(true)}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Medicine</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <b>{name}</b>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
