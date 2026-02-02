
import UpdateCategoryBtn from "@/components/category/UpdateCategoryBtn";

import { categoryService } from "@/services/category.service"

interface Cat {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}


export default async function Categories() {
  const data = await categoryService.getAllCategories()


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.data.data.map((cat: Cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <span className="font-medium">
                    {cat?.name}
                  </span>
                </td>

                <td className="p-3">
                  {cat?.description}
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-4">
                  <UpdateCategoryBtn category={cat} />
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
