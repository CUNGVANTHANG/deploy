
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { projectsService } from "@/services/projects.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectCreateDialog({ open, onOpenChange }: ProjectCreateDialogProps) {
  const queryClient = useQueryClient();
  const [newProject, setNewProject] = useState({ name: '', code: '', description: '' });

  const createProjectMutation = useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['projects'] });
       onOpenChange(false);
       setNewProject({ name: '', code: '', description: '' });
       toast.success("Tạo dự án thành công!");
    }
  });

  const handleCreate = () => {
     if (!newProject.name || !newProject.code) return;
     createProjectMutation.mutate({
        ...newProject,
        tenantId: 't1',
        status: 'ACTIVE',
        memberIds: [],
        progress: 0
     } as any);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent>
          <DialogHeader>
             <DialogTitle>Tạo dự án mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="grid gap-2">
                <Label>Tên dự án</Label>
                <Input 
                   value={newProject.name} 
                   onChange={e => setNewProject({...newProject, name: e.target.value})}
                   placeholder="Ví dụ: Website Redesign"
                />
             </div>
             <div className="grid gap-2">
                <Label>Mã dự án (Code)</Label>
                <Input 
                   value={newProject.code} 
                   onChange={e => setNewProject({...newProject, code: e.target.value})}
                   placeholder="Ví dụ: WEB-2024"
                />
             </div>
             <div className="grid gap-2">
                <Label>Mô tả</Label>
                <Textarea 
                   value={newProject.description} 
                   onChange={e => setNewProject({...newProject, description: e.target.value})}
                   placeholder="Mô tả dự án..."
                />
             </div>
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
             <Button onClick={handleCreate} disabled={createProjectMutation.isPending}>
                {createProjectMutation.isPending ? 'Đang tạo...' : 'Tạo dự án'}
             </Button>
          </DialogFooter>
       </DialogContent>
    </Dialog>
  );
}
