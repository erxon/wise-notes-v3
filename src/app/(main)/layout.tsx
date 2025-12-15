import AppSidebar from "@/components/app-sidebar/appsidebar";
import SiteHeader from "@/components/siteheader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div>
            <SiteHeader />
            <main className="md:w-3/4 mx-auto px-4 pt-5">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
