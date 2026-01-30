import { env } from "@/env"
import { ur } from "zod/v4/locales"

const API_URL = env.API_URL

interface getBlogsParams {
    isFeatured?: boolean,
    search?: string
}
interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}


export const blogService = {
    getBlogPost: async function (params?: getBlogsParams, options?: ServiceOption) {
        try {
            const url = new URL(`${API_URL}/posts`)

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

            const res = await fetch(url.toString(),config)

            const data = await res.json()
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    },
    getBlogById: async function(id:string){
        try {
            const res = await fetch(`${API_URL}/posts/${id}`)
            const data = await res.json()
            return {data:data, error:null}
            
        } catch (error) {
            console.log(error);
        }
    }

}

