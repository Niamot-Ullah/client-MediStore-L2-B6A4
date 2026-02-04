import UserStatusSelect from "@/components/user/UserStatusSelect";
import { medicineService } from "@/services/medicine.service"



export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  phone: string | null
  role: "ADMIN" | "CUSTOMER" | "SELLER"
  status: "ACTIVE" | "SUSPENDED"
  createdAt: string
  updatedAt: string
}



export default async function UserManagement() {
  const data = await medicineService.getAllUser()
  // console.log(data.data.data);
  const users = data?.data.data
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user: User) => (
              <tr key={user?.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.image ?? "/images/default-avatar.png"}
                    alt={user?.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="font-medium">
                    {user?.name}
                  </span>
                </td>

                <td className="p-3">{user?.email}</td>
                <td className="p-3">{user?.phone}</td>
                <td className="p-3 font-semibold">
                  {user?.role}
                </td>


                <td className="p-3 text-gray-500">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <UserStatusSelect
                    userId={user?.id}
                    currentStatus={user.status}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
