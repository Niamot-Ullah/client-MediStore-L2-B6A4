"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/category/CategoryForm";

interface CategoryData {
    id: string;
    name: string;
    description: string;
}

export default function UpdateCategoryBtn({ category }: { category: CategoryData }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpdate = async (data: Omit<CategoryData, "id">) => {
        const toastId = toast.loading("Updating category...");

        try {
            setIsLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to update category");
            }

            toast.success("Category updated successfully ✅", {
                id: toastId,
            });

            setOpen(false);
            router.refresh(); 

        } catch (error: any) {
            toast.error(error.message || "Something went wrong", {
                id: toastId,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
       
            <button
                onClick={() => setOpen(true)}
                className="text-blue-600 hover:scale-110 transition"
            >
                <Upload size={18} />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
                    <div className="relative w-full max-w-lg">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow"
                        >
                            <X size={18} />
                        </button>

                        <CategoryForm
                            initialData={{
                                name: category.name,
                                description: category.description,
                            }}
                            onSubmit={handleUpdate}
                            onCancel={() => setOpen(false)}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
