
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { feedbackService } from "@/services/feedback.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface FeedbackSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackSubmitDialog({ open, onOpenChange }: FeedbackSubmitDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
     title: '',
     type: '',
     priority: '',
     description: ''
  });

  const submitMutation = useMutation({
    mutationFn: feedbackService.submitFeedback,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['feedback'] });
       setFormData({ title: '', type: '', priority: '', description: '' });
       onOpenChange(false);
       toast.success("Gửi phản hồi thành công!");
    }
  });

  const handleSubmit = () => {
     if (!formData.title || !formData.type || !formData.priority) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
     }
     submitMutation.mutate({
        ...formData,
        fromName: 'Current User', // Should get from auth
        fromEmail: 'user@example.com',
        message: formData.description
     } as any);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-xl">
          <DialogHeader>
             <DialogTitle>Gửi phản hồi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input 
                  id="title" 
                  placeholder="Tóm tắt ngắn gọn vấn đề" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="type">Loại</Label>
                   <Select value={formData.type} onValueChange={val => setFormData({...formData, type: val})}>
                      <SelectTrigger id="type">
                         <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="BUG">Báo lỗi</SelectItem>
                         <SelectItem value="FEATURE">Yêu cầu tính năng</SelectItem>
                         <SelectItem value="SUPPORT">Hỗ trợ</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="priority">Mức độ ưu tiên</Label>
                   <Select value={formData.priority} onValueChange={val => setFormData({...formData, priority: val})}>
                      <SelectTrigger id="priority">
                         <SelectValue placeholder="Chọn mức độ" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="LOW">Thấp</SelectItem>
                         <SelectItem value="MEDIUM">Trung bình</SelectItem>
                         <SelectItem value="HIGH">Cao</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
             </div>

             <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea 
                  id="description" 
                  placeholder="Mô tả chi tiết..." 
                  className="min-h-[120px]" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
             </div>
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
             <Button onClick={handleSubmit} disabled={submitMutation.isPending}>
                {submitMutation.isPending ? 'Đang gửi...' : 'Gửi phản hồi'}
             </Button>
          </DialogFooter>
       </DialogContent>
    </Dialog>
  );
}
