
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tasksService } from "@/services/tasks.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface TaskCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskCreateDialog({ open, onOpenChange }: TaskCreateDialogProps) {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({ title: '', priority: '', type: '' });

  const createTaskMutation = useMutation({
    mutationFn: tasksService.createTask,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['tasks'] });
       onOpenChange(false);
       setNewTask({ title: '', priority: '', type: '' });
       toast.success("Tạo công việc thành công!");
    }
  });

  const handleCreate = () => {
     if (!newTask.title || !newTask.priority || !newTask.type) return;
     createTaskMutation.mutate({
        ...newTask,
        status: 'TODO',
        projectCode: 'GEN',
        projectId: 'p1', // Default project
        tags: [],
     } as any);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent>
          <DialogHeader>
             <DialogTitle>Tạo công việc mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="grid gap-2">
                <Label>Tiêu đề</Label>
                <Input 
                   value={newTask.title} 
                   onChange={e => setNewTask({...newTask, title: e.target.value})}
                   placeholder="Làm gì đó..."
                />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label>Loại</Label>
                   <Select value={newTask.type} onValueChange={val => setNewTask({...newTask, type: val})}>
                      <SelectTrigger>
                         <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="FEATURE">Tính năng</SelectItem>
                         <SelectItem value="BUG">Lỗi</SelectItem>
                         <SelectItem value="IMPROVEMENT">Cải tiến</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="grid gap-2">
                   <Label>Độ ưu tiên</Label>
                   <Select value={newTask.priority} onValueChange={val => setNewTask({...newTask, priority: val})}>
                      <SelectTrigger>
                         <SelectValue placeholder="Chọn độ ưu tiên" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="LOW">Thấp</SelectItem>
                         <SelectItem value="MEDIUM">Trung bình</SelectItem>
                         <SelectItem value="HIGH">Cao</SelectItem>
                         <SelectItem value="URGENT">Khẩn cấp</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
             </div>
          </div>
          <DialogFooter className="flex-row justify-end gap-2">
             <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
             <Button onClick={handleCreate} disabled={createTaskMutation.isPending}>
                {createTaskMutation.isPending ? 'Đang tạo...' : 'Tạo'}
             </Button>
          </DialogFooter>
       </DialogContent>
    </Dialog>
  );
}
