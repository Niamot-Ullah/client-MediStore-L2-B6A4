"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CategoryForm from "@/components/category/CategoryForm";

interface CategoryData {
  name: string;
  description: string;
}

export default function AddCategory() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async (data: CategoryData) => {
    const toastId = toast.loading("Creating category...");

    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create category");
      }

      toast.success("Category created successfully 🎉", {
        id: toastId,
      });

      router.push("/dashboard/categories");

    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <CategoryForm
        onSubmit={handleAddCategory}
        isLoading={isLoading}
      />
    </div>
  );
}
