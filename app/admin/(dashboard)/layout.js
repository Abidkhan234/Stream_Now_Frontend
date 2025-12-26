import AdminNav from "@/components/navbar/admin-nav"
import DashSidebar from "@/components/sidebar/dash-sidebar"

import {
    SidebarProvider,
} from "@/components/ui/sidebar"

const layout = ({ children }) => {
    return (
        <SidebarProvider>
            <DashSidebar />
            <main className="w-full h-screen flex flex-col">
                <>
                    <AdminNav />
                </>
                <div className="h-full">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default layout