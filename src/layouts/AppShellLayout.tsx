import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Toaster } from "@/components/ui/sonner";


export function AppShellLayout() {
  return (
    <div className="flex w-full h-screen bg-muted/20 overflow-hidden">
       {/* Sidebar - Hidden on mobile by default (needs Sheet implementation for mobile - todo) */}
       <div className="hidden md:block h-full shadow-xl z-20">
          <AppSidebar className="h-full" />
       </div>

       {/* Main Content */}
       <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          <TopBar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 scroll-smooth">
             <div className="max-w-7xl mx-auto w-full">
                <Outlet />
             </div>
          </main>
          <Toaster />
       </div>
    </div>
  );
}
