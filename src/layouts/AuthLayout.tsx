import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Branding / Visuals */}
      <div className="hidden lg:flex flex-col bg-slate-900 text-white p-10 justify-between">
         <div className="text-2xl font-bold tracking-tight">FUSION</div>
         
         <div className="space-y-4 max-w-lg">
            <blockquote className="text-xl font-medium leading-relaxed">
              "Fusion đã hoàn toàn thay đổi cách chúng tôi quản lý dự án doanh nghiệp. Khả năng đa người thuê chính xác là những gì chúng tôi cần."
            </blockquote>
            <div className="text-sm text-slate-400">
               Sofia Davis, CTO tại Acme Inc
            </div>
         </div>
         
         <div className="text-xs text-slate-500">
            &copy; 2026 Nền tảng Fusion. Đã đăng ký bản quyền.
         </div>
      </div>

      {/* Right: Content (Forms) */}
      <div className="flex flex-col justify-center items-center lg:p-8 bg-background">
         <div className="lg:hidden w-full max-w-md mb-8 text-center">
            <div className="text-2xl font-bold tracking-tight">FUSION</div>
         </div>
         <Outlet />
         <Toaster />
      </div>
    </div>
  );
}
