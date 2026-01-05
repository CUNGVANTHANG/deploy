
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface WorkspaceCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkspaceCreateDialog({ open, onOpenChange }: WorkspaceCreateDialogProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
     if (!name.trim()) return;
     
     setIsLoading(true);
     // Mock API call
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     toast.success("Tạo không gian làm việc thành công!");
     setName('');
     setIsLoading(false);
     onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent>
          <DialogHeader>
             <DialogTitle>Tạo không gian làm việc mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="grid gap-2">
                <Label>Tên không gian (Workspace Name)</Label>
                <Input 
                   value={name} 
                   onChange={e => setName(e.target.value)}
                   placeholder="Ví dụ: Acme Corp, My Startup..."
                   autoFocus
                />
             </div>
          </div>
          <DialogFooter className="flex-row justify-end gap-2">
             <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
             <Button onClick={handleCreate} disabled={!name.trim() || isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo không gian'}
             </Button>
          </DialogFooter>
       </DialogContent>
    </Dialog>
  );
}
