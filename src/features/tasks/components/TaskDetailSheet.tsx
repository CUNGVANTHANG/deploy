import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "@/types";
import { StatusPill } from "@/components/shared/StatusPill";
import { Calendar } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TaskDetailSheetProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailSheet({ task, open, onOpenChange }: TaskDetailSheetProps) {
  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-4">
           <div className="flex items-center gap-2">
              <Badge variant="outline">{task.projectCode}-{task.id.slice(-3)}</Badge>
              <StatusPill status={task.status} />
              <Badge variant={task.type === 'BUG' ? 'destructive' : 'secondary'} className="uppercase text-[10px]">
                 {task.type}
              </Badge>
           </div>
           <SheetTitle className="text-xl font-bold">{task.title}</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
           {/* Meta Data */}
           <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                 <span className="text-xs text-muted-foreground font-medium uppercase">Người thực hiện</span>
                 <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                       <AvatarFallback className="text-[10px]">U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Chưa chỉ định</span>
                 </div>
              </div>
              <div className="space-y-1">
                 <span className="text-xs text-muted-foreground font-medium uppercase">Hạn chót</span>
                 <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{task.dueDate || 'Không có hạn chót'}</span>
                 </div>
              </div>
              <div className="space-y-1">
                 <span className="text-xs text-muted-foreground font-medium uppercase">Mức độ ưu tiên</span>
                 <div className="flex items-center gap-2">
                    <Badge variant="outline" className={task.priority === 'HIGH' ? 'text-red-500 border-red-200 bg-red-50' : ''}>
                       {task.priority}
                    </Badge>
                 </div>
              </div>
           </div>

           <Separator />

           <div className="space-y-2">
              <h3 className="font-semibold text-sm">Mô tả</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                 {task.description || "Không có mô tả cho công việc này."}
              </p>
           </div>
           
           <div className="space-y-2">
               <h3 className="font-semibold text-sm">Checklist</h3>
               <div className="space-y-2">
                   {/* Mock Checklist items */}
                   <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Xem lại yêu cầu</span>
                   </label>
                   <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Thực hiện logic chính</span>
                   </label>
               </div>
           </div>

           <Separator />
           
           <div className="space-y-4">
              <h3 className="font-semibold text-sm">Hoạt động</h3>
              <div className="flex gap-3">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback>ME</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 space-y-2">
                    <Textarea placeholder="Viết bình luận..." className="min-h-[80px]" />
                    <Button size="sm">Bình luận</Button>
                 </div>
              </div>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
