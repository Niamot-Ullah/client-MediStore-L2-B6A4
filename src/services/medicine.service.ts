import { env } from "@/env";
import { getMedicineParams } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}

export const medicineService = {
    getAllMedicines: async function (params?: getMedicineParams, options?: ServiceOption) {
        try {
            const url = new URL(`${API_URL}/api/medicines`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (options?.cache) {
                config.cache = options.cache;
            }
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error('Error in getAllMedicines:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong"
            };
        }
    },
    getAllMedicinesForAdmin: async function (params?: getMedicineParams, options?: ServiceOption) {
        try {

            const res = await fetch(`${API_URL}/api/medicines/admin`);
        
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error('Error in getAllMedicines:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong"
            };
        }
    },

    getMedicineById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines/details/${id}`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error('Error in getMedicineById:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong"
            };
        }
    },
    deleteMedicine: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/medicines/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to delete medicine");
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong"
            };
        }
    },
    getMyPostedMedicine: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/medicines/my-posted-medicine`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",

            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong"
            };
        }
    },
    getSellerOrder: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/orders/seller`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",

            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },
    getAllOrder: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/orders`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",

            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },
    getAllUser: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",

            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

};