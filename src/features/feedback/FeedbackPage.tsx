import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feedbackService } from "@/services/feedback.service";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
     title: '',
     type: '',
     priority: '',
     description: ''
  });

  const { data: feedbackList } = useQuery({
    queryKey: ['feedback'],
    queryFn: feedbackService.getFeedback
  });

  const submitMutation = useMutation({
    mutationFn: feedbackService.submitFeedback,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['feedback'] });
       setFormData({ title: '', type: '', priority: '', description: '' });
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold tracking-tight">Trung tâm phản hồi</h1>
            <p className="text-muted-foreground text-sm">Gửi lỗi, tính năng và theo dõi trạng thái.</p>
         </div>
      </div>

      <Tabs defaultValue="inbox" className="space-y-6">
         <TabsList>
            <TabsTrigger value="inbox">Hộp thư</TabsTrigger>
            <TabsTrigger value="submit">Gửi phản hồi mới</TabsTrigger>
         </TabsList>

         <TabsContent value="inbox" className="space-y-4">
            <div className="grid gap-4">
               {feedbackList?.map((item: any) => (
                  <Card key={item.id}>
                     <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                           <div className="space-y-1">
                              <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                              <CardDescription className="text-xs">
                                 Từ: {item.fromName} • {format(new Date(item.createdAt), 'dd MMM, yyyy')}
                              </CardDescription>
                           </div>
                           <Badge variant={item.type === 'BUG' ? 'destructive' : 'secondary'}>{item.type}</Badge>
                        </div>
                     </CardHeader>
                     <CardContent className="p-4 pt-2">
                        <p className="text-sm text-foreground/80">{item.message}</p>
                        <div className="mt-4 flex gap-2">
                           <Button size="sm" variant="outline">Chuyển thành công việc</Button>
                           <Button size="sm" variant="outline">Đánh dấu đã xử lý</Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </TabsContent>

         <TabsContent value="submit">
            <Card className="max-w-2xl">
               <CardHeader>
                  <CardTitle>Gửi phản hồi</CardTitle>
                  <CardDescription>Bạn tìm thấy lỗi hoặc có ý tưởng? Hãy cho chúng tôi biết.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
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

                  <Button className="w-full" onClick={handleSubmit} disabled={submitMutation.isPending}>
                     {submitMutation.isPending ? 'Đang gửi...' : 'Gửi phản hồi'}
                  </Button>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>
    </div>
  );
}
