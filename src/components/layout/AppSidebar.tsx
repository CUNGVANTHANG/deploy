import { 
  Building2, 
  CheckSquare, 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronDown,
  Plus,
  User
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_TENANTS, MOCK_USERS, CURRENT_USER_ID } from "@/mocks/common";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Tổng quan', path: '/dashboard' },
  { icon: CheckSquare, label: 'Dự án', path: '/projects' },
  { icon: Building2, label: 'Đội nhóm', path: '/teams' },
  { icon: MessageSquare, label: 'Phản hồi', path: '/feedback' },
];

import { WorkspaceCreateDialog } from "@/features/settings/components/WorkspaceCreateDialog";
import { useState } from "react";

// ... existing imports

export function AppSidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = MOCK_USERS.find(u => u.id === CURRENT_USER_ID) || MOCK_USERS[0];
  const currentTenant = MOCK_TENANTS[0]; // Mock current tenant
  
  const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);

  return (
    <aside className={cn("flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border", className)}>
      {/* Sidebar Header: Logo & Tenant Switcher */}
      <div className="p-4 border-b border-sidebar-border">
        {/* Logo section */}
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
             <h1 className="font-bold text-lg leading-tight tracking-tight">FUSION</h1>
             <p className="text-xs text-sidebar-primary/80">Enterprise Platform</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-sidebar-accent/10 border-sidebar-accent/20 hover:bg-sidebar-accent/20 text-sidebar-foreground h-12">
              <div className="flex items-center gap-2 overflow-hidden">
                 <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">
                    {currentTenant.name[0]}
                 </div>
                 <div className="text-left truncate">
                   <div className="text-sm font-semibold truncate">{currentTenant.name}</div>
                   <div className="text-xs text-sidebar-foreground/60">5 members</div>
                 </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Chuyển không gian làm việc</DropdownMenuLabel>
            {MOCK_TENANTS.map(tenant => (
               <DropdownMenuItem key={tenant.id} className="cursor-pointer">
                  <div className={cn("w-4 h-4 mr-2 rounded-full", `bg-${tenant.themeAccent}`)} />
                  {tenant.name}
               </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsWorkspaceDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Tạo không gian mới
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <WorkspaceCreateDialog 
         open={isWorkspaceDialogOpen} 
         onOpenChange={setIsWorkspaceDialogOpen} 
      />

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
           {NAV_ITEMS.map((item) => {
             const isActive = location.pathname.startsWith(item.path);
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                   isActive 
                     ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                     : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                 )}
               >
                 <item.icon className="h-5 w-5" />
                 {item.label}
               </Link>
             );
           })}
        </nav>

        <div className="mt-8 px-4 text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider">
           Đội nhóm của bạn
        </div>
        <div className="mt-2 px-2 space-y-1">
             {["Design Team", "Backend Devs"].map(team => (
                <button 
                  key={team} 
                  onClick={() => navigate('/teams')}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors"
                >
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                   {team}
                </button>
             ))}
        </div>
      </ScrollArea>

      {/* User Footer */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/5">
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <button className="flex items-center gap-3 w-full hover:bg-sidebar-accent/20 p-2 rounded-lg transition-colors text-left group">
                <Avatar className="h-9 w-9 border border-sidebar-border group-hover:border-sidebar-primary/50 transition-colors">
                  <AvatarFallback className={currentUser.avatarColor}>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                   <p className="text-sm font-medium truncate text-sidebar-foreground">{currentUser.name}</p>
                   <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.email}</p>
                </div>
                <Settings className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground" />
             </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Cài đặt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
                onClick={() => navigate('/auth/login')}
              >
                <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
              </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
      </div>
    </aside>
  );
}
