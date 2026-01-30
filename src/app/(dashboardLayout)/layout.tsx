
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import AdminDashboard from "./@admin/admin-dashboard/page"
import UserDashboard from "./@user/user-dashboard/page"
import React from "react"
import { userService } from "@/services/user.service"

export default async function DashboardLayout({admin,user,children}:{
    children:React.ReactNode,
    admin:React.ReactNode,
    user:React.ReactNode,
}) {
    const { data } = await userService.getSession()
    console.log(data.user.role );
    const userInfo = {
        role:data.user.role 
    }
    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div>
                    {userInfo.role==='ADMIN' ? admin:user}
                    {/* {children} */}
                    
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
