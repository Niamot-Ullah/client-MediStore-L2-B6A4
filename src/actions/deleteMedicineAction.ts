
"use server";

import { revalidatePath } from "next/cache";

import { medicineService } from "@/services/medicine.service";

export async function deleteMedicineAction(id: string) {
  const res = await medicineService.deleteMedicine(id);

  if (res.error) {
    throw new Error("Delete failed");
  }

  
  revalidatePath("/dashboard/seller/posted-medicine");
}
