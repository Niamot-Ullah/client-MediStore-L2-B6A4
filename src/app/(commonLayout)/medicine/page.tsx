import { medicineService } from "@/services/medicine.service";
import { getMedicineParams } from "@/types";
import MedicineSearch from "@/components/medicine/MedicineSearch";
import MedicineCard from "@/components/medicine/MedicineCard";

export const dynamic = "auto";

export default async function Medicine({
  searchParams,
}: {
  searchParams: getMedicineParams;
}) {
  const { data, error } = await medicineService.getAllMedicines(
    { ...searchParams },
    { cache: "no-store" }
  );

  if (error) {
    return <div>Error fetching medicines: {error.toString()}</div>;
  }

  const medicines = data?.data?.data || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medicines</h1>

      {/* 🔍 SEARCH UI */}
      <MedicineSearch />

      {medicines.length === 0 ? (
        <div>No medicines found.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {medicines.map((medicine: any) => (
            <MedicineCard key={medicine.id} medicine={medicine}></MedicineCard>
            
          ))}
        </div>
      )}
    </div>
  );
}
