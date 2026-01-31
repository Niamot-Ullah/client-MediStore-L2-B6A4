import { env } from "@/env"
import { ur } from "zod/v4/locales"
import { getMedicineParams } from "@/types";

const API_URL = env.API_URL

// interface getMedicineParams {
//     isFeatured?: boolean,
//     search?: string
// }
interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}


export const medicineService = {
    getAllMedicines: async function (params?: getMedicineParams, options?: ServiceOption) {
        try {
            const url = new URL(`${API_URL}/api/medicines`)

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value)
                    }
                })
            }
            const config: RequestInit = {};
            if (options?.cache) {
                config.cache = options.cache;
            }
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }
            const res = await fetch(url.toString(), config)
            const data = await res.json()
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: error || "Something went wrong" }
        }
    },
    getMedicineById: async function(id:string){
        try {
            const res = await fetch(`${API_URL}/api/medicines/details/${id}`)
            const data = await res.json()
            return {data:data, error:null}

        } catch (error) {
            console.log(error);
        }
    },


}

