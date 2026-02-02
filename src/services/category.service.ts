import { env } from "@/env";

const API_URL = env.API_URL;

export const categoryService = {
    getAllCategories: async () => {
        try {
            const res = await fetch(`${API_URL}/api/categories`, {
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to fetch categories");

            const data = await res.json();
            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong",
            };
        }
    },

    createCategory: async (payload: {
        name: string;
        description: string;
    }) => {
        try {
            const res = await fetch(`${API_URL}/api/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create category");

            const data = await res.json();
            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong",
            };
        }
    },

    deleteCategory: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/api/categories/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to delete category");
            }

            const data = await res.json();
            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong",
            };
        }
    },
};
