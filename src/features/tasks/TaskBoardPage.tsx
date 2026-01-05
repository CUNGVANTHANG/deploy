import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";
import { Task } from "@/types";
import { TaskCard } from "./components/TaskCard";
import { TaskDetailSheet } from "./components/TaskDetailSheet";
import { TaskCreateDialog } from "./components/TaskCreateDialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const COLUMNS = [
  { id: 'TODO', label: 'Cần làm', color: 'bg-slate-500' },
  { id: 'IN_PROGRESS', label: 'Đang làm', color: 'bg-blue-500' },
  { id: 'REVIEW', label: 'Đang duyệt', color: 'bg-amber-500' },
  { id: 'DONE', label: 'Hoàn thành', color: 'bg-emerald-500' },
];

export default function TaskBoardPage() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getTasks()
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSheetOpen(true);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold tracking-tight">Bảng công việc</h1>
         <div className="flex gap-2">
            <Button size="sm" onClick={() => setIsDialogOpen(true)}><Plus className="mr-2 h-4 w-4" /> Tạo công việc</Button>
            <TaskCreateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
         </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
         {COLUMNS.map(col => {
            const colTasks = tasks?.filter((t: any) => t.status === col.id) || [];
            
            return (
               <div key={col.id} className="flex-shrink-0 w-80 flex flex-col bg-muted/30 rounded-xl border">
                  <div className="p-3 flex items-center justify-between border-b bg-muted/40 rounded-t-xl">
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${col.color}`} />
                        <span className="font-semibold text-sm">{col.label}</span>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
                           {colTasks.length}
                        </span>
                     </div>
                     <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                     </Button>
                  </div>
                  
                  <ScrollArea className="flex-1 p-3">
                     <div className="space-y-3">
                        {isLoading ? (
                           // Skeleton
                           [1,2].map(i => <div key={i} className="h-24 bg-background rounded-lg animate-pulse" />)
                        ) : colTasks.map((task: any) => (
                           <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
                        ))}
                     </div>
                  </ScrollArea>
               </div>
            );
         })}
      </div>

      <TaskDetailSheet 
         task={selectedTask} 
         open={isSheetOpen} 
         onOpenChange={setIsSheetOpen} 
      />
    </div>
  );
}
