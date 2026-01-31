import { Navbar1 } from "@/components/layout/navbar1";
import { userService } from "@/services/user.service";
import { User } from "@/types";


export default async function CommonLayout({children}:{children:React.ReactNode}) {
  const {data} = await userService.getSession();
  return (
    <div>
        <Navbar1 user={data?.user as User}></Navbar1>
        {children}
    </div>
  )
}
