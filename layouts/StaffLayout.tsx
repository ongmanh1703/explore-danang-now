import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "../src/components/ui/sidebar";
import { StaffSidebar } from "../src/components/admin/StaffSidebar";

interface StaffLayoutProps {
  children: ReactNode;
}

export function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur px-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Quản lý nội dung</h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
