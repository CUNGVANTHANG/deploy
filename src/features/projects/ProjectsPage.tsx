import { useQuery } from "@tanstack/react-query";
import { projectsService } from "@/services/projects.service";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectCreateDialog } from "./components/ProjectCreateDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ProjectsPage() {
  const [filter, setFilter] = useState('ALL');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', filter],
    queryFn: () => projectsService.getProjects(filter)
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-2xl font-bold tracking-tight">Dự án</h1>
            <p className="text-muted-foreground text-sm">Quản lý và theo dõi các dự án của đội nhóm.</p>
         </div>
         <div className="flex items-center gap-2">
             <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Dự án mới
             </Button>
             <ProjectCreateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
         <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
               placeholder="Tìm kiếm dự án..." 
               className="pl-9 w-full" 
            />
         </div>
         <Select value={filter} onValueChange={setFilter}>
             <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                   <SlidersHorizontal className="h-4 w-4" />
                   <SelectValue placeholder="Trạng thái" />
                </div>
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="ALL">Tất cả</SelectItem>
                <SelectItem value="ACTIVE">Đang hoạt động</SelectItem>
                <SelectItem value="ARCHIVED">Đã lưu trữ</SelectItem>
             </SelectContent>
         </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {isLoading ? (
            // Skeletons
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-[200px] rounded-xl bg-muted/50 animate-pulse" />
            ))
         ) : projects?.map((project: any) => (
             <ProjectCard key={project.id} project={project} />
         ))}
      </div>
    </div>
  );
}
