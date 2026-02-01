import { env } from "@/env";
import { getMedicineParams } from "@/types";

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

    getMedicineById: async function(id: string) {
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
};