"use server"

import { blogService } from "@/services/medicine.service"


export const getBlogs = async()=>{
    return await blogService.getBlogPost();
}