import { medicineService } from "@/services/medicine.service";
import { getMedicineParams } from "@/types";
import MedicineSearch from "@/components/medicine/MedicineSearch";

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
            <div
              key={medicine.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h2 style={{ margin: "10px 0" }}>{medicine.name}</h2>
              <p>{medicine.description}</p>
              <p>
                <strong>Price:</strong> ${medicine.price}
              </p>
              <p>
                <strong>Stock:</strong> {medicine.stock}
              </p>
              {medicine.isFeatured && (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Featured
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
