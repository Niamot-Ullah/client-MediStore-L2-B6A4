export const dynamic = 'force-dynamic';

import { AppSidebar } from "@/components/layout/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { userService } from "@/services/user.service"
import { Roles } from "@/constants/roles"

export default async function DashboardLayout({ admin, seller, customer, children }: {
    children: React.ReactNode,
    admin: React.ReactNode,
    seller: React.ReactNode,
    customer: React.ReactNode,
}) {
    const { data } = await userService.getSession()
    // console.log(data.user.role);
   
    return (
        <SidebarProvider>
            <AppSidebar user={data?.user} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                  
                </header>
                <div>
                
                    {(data?.user?.role === Roles.admin) ? admin : (data?.user?.role === Roles.seller) ? seller : (data?.user?.role === Roles.customer) ? customer : null}

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
