import { Bell, HelpCircle, Menu, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { MOCK_USERS, CURRENT_USER_ID } from "@/mocks/common";
import { useState } from "react";
import { TaskCreateDialog } from "@/features/tasks/components/TaskCreateDialog";
import { ProjectCreateDialog } from "@/features/projects/components/ProjectCreateDialog";
import { FeedbackSubmitDialog } from "@/features/feedback/components/FeedbackSubmitDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/layout/AppSidebar";

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = MOCK_USERS.find(u => u.id === CURRENT_USER_ID);
  
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Tổng quan';
    if (path.includes('projects')) return 'Dự án';
    if (path.includes('teams')) return 'Đội nhóm';
    if (path.includes('feedback')) return 'Phản hồi';
    if (path.includes('notifications')) return 'Thông báo';
    if (path.includes('help')) return 'Trợ giúp';
    if (path.includes('docs')) return 'Tài liệu';
    return 'Tổng quan';
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <Sheet>
           <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                 <Menu className="h-5 w-5" />
              </Button>
           </SheetTrigger>
           <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r-sidebar-border text-sidebar-foreground">
              <AppSidebar className="w-full border-r-0 h-full" />
           </SheetContent>
        </Sheet>
        
        <div className="flex flex-col">
           <h2 className="text-lg font-semibold leading-none">{getPageTitle()}</h2>
           {location.pathname === '/dashboard' && (
              <p className="text-xs text-muted-foreground mt-1">Chào mừng trở lại, {currentUser?.name}</p>
           )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
         <div className="relative w-full max-w-sm hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Tìm kiếm..." 
              className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1"
            />
         </div>

         <div className="h-6 w-px bg-border mx-2 hidden md:block" />

         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button className="hidden md:flex gap-2 h-9">
               <Plus className="h-4 w-4" />
               <span className="hidden lg:inline">Tạo mới</span>
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end">
             <DropdownMenuLabel>Tạo mới</DropdownMenuLabel>
             <DropdownMenuItem onClick={() => setTaskDialogOpen(true)}>Công việc mới</DropdownMenuItem>
             <DropdownMenuItem onClick={() => setProjectDialogOpen(true)}>Dự án mới</DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={() => setFeedbackDialogOpen(true)}>Gửi phản hồi</DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>

         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-[90vw] sm:w-80">
             <DropdownMenuLabel className="flex items-center justify-between">
                <span>Thông báo</span>
                <span className="text-xs font-normal text-muted-foreground cursor-pointer hover:underline">Đánh dấu đã đọc</span>
             </DropdownMenuLabel>
             <DropdownMenuSeparator />
             <div className="max-h-[300px] overflow-y-auto">
               <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3 bg-muted/30">
                 <div className="font-medium text-sm">Bạn được gán vào dự án mới</div>
                 <div className="text-xs text-muted-foreground">Techlead đã thêm bạn vào dự án "Website Redesign"</div>
                 <div className="text-[10px] text-muted-foreground self-end mt-1">2 phút trước</div>
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                 <div className="font-medium text-sm">Công việc sắp đến hạn</div>
                 <div className="text-xs text-muted-foreground">Task "Review Design" sẽ hết hạn trong 2 giờ tới.</div>
                 <div className="text-[10px] text-muted-foreground self-end mt-1">1 giờ trước</div>
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                 <div className="font-medium text-sm">Cập nhật hệ thống</div>
                 <div className="text-xs text-muted-foreground">Hệ thống FUSION đã được cập nhật lên v2.0</div>
                 <div className="text-[10px] text-muted-foreground self-end mt-1">1 ngày trước</div>
               </DropdownMenuItem>
             </div>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="cursor-pointer justify-center text-center text-primary font-medium" onClick={() => navigate('/notifications')}>
               Xem tất cả thông báo
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>

         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
               <HelpCircle className="h-5 w-5" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-56">
             <DropdownMenuLabel>Trợ giúp & Hỗ trợ</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/help')}>
               Trung tâm trợ giúp
             </DropdownMenuItem>
             <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/docs')}>
               Tài liệu hướng dẫn (Docs)
             </DropdownMenuItem>
             <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/shortcuts')}>
               Phím tắt
             </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="cursor-pointer" onClick={() => setFeedbackDialogOpen(true)}>
               Báo lỗi / Góp ý
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
      </div>
      
      <TaskCreateDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} />
      <ProjectCreateDialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen} />
      <FeedbackSubmitDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </header>
  );
}
