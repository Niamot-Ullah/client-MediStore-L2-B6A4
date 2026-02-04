import { medicineService } from "@/services/medicine.service";
import { getMedicineParams } from "@/types";
import MedicineSearch from "@/components/medicine/MedicineSearch";
import MedicineCard from "@/components/medicine/MedicineCard";
import PaginationControls from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function Medicine({
  searchParams,
}: {
  searchParams: Promise<getMedicineParams> | getMedicineParams;
}) {
  const filters = await Promise.resolve(searchParams);

  const res = await medicineService.getAllMedicines(
    {
      search: filters.search,
      isFeatured: filters.isFeatured,
      page: filters?.page || 1,
      limit: filters?.limit || 8,
      sortBy: filters.sortBy || 'createdAt',
      sortOrder: filters.sortOrder || 'desc',
    },
    { cache: "no-store" }
  );

  // Handle error case
  if (res.error || !res.data?.success) {
    return (
      <div className="p-5">
        <MedicineSearch />
        <div className="text-red-500">
          Error loading medicines: {res.error || 'Failed to load data'}
        </div>
      </div>
    );
  }

  const medicines = res.data.data?.data || [];
  const apiPagination = res.data.data?.pagination;

  const limit = Number(filters.limit) || 8;
  const page = Number(filters.page) || 1;


  const total = apiPagination?.total || 0;
  const totalPages = apiPagination?.totalPages || Math.ceil(total / limit);

  const pagination = {
    limit,
    page,
    total,
    totalPages,
  };

  return (
    <div className="p-5">
      <MedicineSearch />

      {medicines.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No medicines found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 mt-5">
            {medicines?.map((medicine: any) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls meta={pagination} />
          )}
        </>
      )}
    </div>
  );
}