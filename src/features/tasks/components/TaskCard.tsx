import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "@/types";
import { AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityColor = task.priority === 'URGENT' ? 'bg-red-50 border-red-200' :
                        task.priority === 'HIGH' ? 'bg-orange-50 border-orange-200' : 
                        'bg-card';

  return (
    <Card 
       className={cn("cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group", priorityColor)}
       onClick={() => onClick(task)}
    >
      <CardContent className="p-3 space-y-2.5">
         <div className="flex justify-between items-start">
             <span className="text-[10px] text-muted-foreground font-mono">{task.projectCode}-{task.id}</span>
             {task.priority === 'URGENT' && <AlertCircle className="h-3 w-3 text-red-500" />}
         </div>
         <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
            {task.title}
         </p>
         <div className="flex flex-wrap gap-1">
            {task.tags.map(tag => (
               <Badge key={tag} variant="secondary" className="px-1 py-0 text-[10px] font-normal text-muted-foreground bg-white/50">
                  {tag}
               </Badge>
            ))}
         </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
         <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            {task.dueDate && <Clock className="h-3 w-3" />}
            {task.dueDate}
         </div>
         <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[8px]">U</AvatarFallback>
         </Avatar>
      </CardFooter>
    </Card>
  );
}
