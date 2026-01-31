import Footer from "@/components/homepage/Footer";
import { Navbar1 } from "@/components/layout/navbar1";

import { userService } from "@/services/user.service";



export default async function CommonLayout({ children }: { children: React.ReactNode }) {
  const { data } = await userService.getSession();
  // const medicine = await blogService.getAllMedicine()
  // console.log(medicine);
  return (
    <div>
      <Navbar1 user={data?.user ?? null}></Navbar1>
      {children}
      <Footer></Footer>
    </div>
  )
}
