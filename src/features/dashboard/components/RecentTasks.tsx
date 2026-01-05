import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { StatusPill } from "@/components/shared/StatusPill";
import { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useState } from "react";
import { TaskDetailSheet } from "@/features/tasks/components/TaskDetailSheet";

import { useNavigate } from "react-router-dom";

export function RecentTasks({ tasks }: { tasks: Partial<Task>[] }) {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAction = (task: Partial<Task>) => {
     // Cast partial task to full task for display safe-ish since it's mock
     setSelectedTask(task as Task);
     setIsSheetOpen(true);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
         <CardTitle className="text-base font-semibold">Công việc gần đây</CardTitle>
         <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={() => navigate('/task-board')}>Xem tất cả</Button>
      </CardHeader>
      <CardContent className="p-0">
         <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                 <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9 bg-primary/10 text-primary border-transparent">
                      <AvatarFallback className="text-xs font-bold text-primary">
                         {task.title?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                       <p className="text-sm font-medium leading-none">{task.title}</p>
                       <p className="text-xs text-muted-foreground">{task.projectCode} • {task.type}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <StatusPill status={task.status!} />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                           <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => handleAction(task)}>Xem chi tiết</DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleAction(task)}>Cập nhật trạng thái</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
              </div>
            ))}
         </div>
      </CardContent>

      <TaskDetailSheet 
         task={selectedTask} 
         open={isSheetOpen} 
         onOpenChange={setIsSheetOpen} 
      />
    </Card>
  );
}
