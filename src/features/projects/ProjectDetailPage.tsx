import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService } from "@/services/projects.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Settings, Share2, MessageSquare, FileText, User, Mail, Save } from "lucide-react";
import TaskBoardPage from "@/features/tasks/TaskBoardPage"; // Reusing board
import { RecentTasks } from "@/features/dashboard/components/RecentTasks";
import { MOCK_RECENT_TASKS } from "@/mocks/dashboard"; // Mock usage
import { MOCK_USERS } from "@/mocks/common";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsService.getProjectById(projectId!)
  });

  const updateProjectMutation = useMutation({
    mutationFn: (updates: any) => projectsService.updateProject(projectId!, updates),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['project', projectId] });
       toast.success("Cập nhật dự án thành công!");
    }
  });

  const [formData, setFormData] = useState({ name: '', description: '' });

  // Initialize form data when project loads
  if (project && formData.name === '') {
     setFormData({ name: project.name, description: project.description });
  }

  const handleShare = () => {
     navigator.clipboard.writeText(window.location.href);
     toast.success("Đã sao chép liên kết dự án vào clipboard!");
  };

  if (!project) return <div className="p-8">Đang tải dự án...</div>;

  const members = (project.memberIds || []).map((id: string) => 
     MOCK_USERS.find(u => u.id === id) || { id, name: 'Unknown', email: '', avatar: '' }
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-6">
         <div className="space-y-2">
            <div className="flex items-center gap-2">
               <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
               <Badge variant="outline" className="text-lg py-0.5">{project.code}</Badge>
               <Badge variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}>{project.status}</Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">{project.description}</p>
         </div>
         <div className="flex gap-2 items-start">
            <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Chia sẻ</Button>
            <Button onClick={() => setActiveTab("settings")}><Settings className="mr-2 h-4 w-4" /> Cài đặt</Button>
         </div>
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
         <div className="w-full overflow-x-auto pb-2">
            <TabsList className="min-w-full w-max justify-start h-auto p-1">
               <TabsTrigger value="overview">Tổng quan</TabsTrigger>
               <TabsTrigger value="board">Bảng công việc</TabsTrigger>
               <TabsTrigger value="members">Thành viên</TabsTrigger>
               <TabsTrigger value="files">Tài liệu</TabsTrigger>
               <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>
         </div>

         <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
               <div className="md:col-span-2 space-y-6">
                  <RecentTasks tasks={MOCK_RECENT_TASKS.filter(t => t.projectCode === project.code)} />
                  {/* Mock Activity Stream */}
                  {/* ... (Activity Stream code same as before, omitted for brevity if no changes) ... */}
                  <div className="border rounded-xl p-4 space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                         <MessageSquare className="h-4 w-4" /> Thảo luận
                      </h3>
                      <div className="space-y-4">
                         <div className="flex gap-3 text-sm">
                            <Avatar className="h-8 w-8"><AvatarFallback>SJ</AvatarFallback></Avatar>
                            <div>
                               <p className="font-medium">Sarah Jenkins <span className="text-muted-foreground font-normal">đã bình luận</span></p>
                               <p className="text-muted-foreground mt-1">Chúng ta cần cập nhật API schema trước khi tiếp tục.</p>
                            </div>
                         </div>
                      </div>
                   </div>
               </div>
               
               <div className="space-y-6">
                  <div className="border rounded-xl p-4">
                     <h3 className="font-semibold mb-4">Thống kê dự án</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Tiến độ</span>
                           <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="bg-secondary h-2 rounded-full overflow-hidden">
                           <div className="bg-primary h-full" style={{ width: `${project.progress}%` }} />
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                           <span className="text-muted-foreground">Hạn chót</span>
                           <span className="font-medium">31 Th12, 2026</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="border rounded-xl p-4">
                     <h3 className="font-semibold mb-4">Nhóm</h3>
                     <div className="flex flex-wrap gap-2">
                        {project.memberIds.map((m: string) => (
                           <Avatar key={m} className="h-8 w-8"><AvatarFallback>U</AvatarFallback></Avatar>
                        ))}
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                           <span className="text-xs">+</span>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="board" className="min-h-[500px]">
            <TaskBoardPage /> 
         </TabsContent>
         
         <TabsContent value="members">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               {members.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                     <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="space-y-1">
                        <h4 className="font-medium leading-none">{member.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                           <Mail className="h-3 w-3" /> {member.email}
                        </p>
                        <Badge variant="secondary" className="text-[10px] mt-1">{member.role}</Badge>
                     </div>
                  </div>
               ))}
               <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center mb-2">
                     <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Thêm thành viên</span>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="files">
             <div className="grid gap-4 md:grid-cols-4">
                {[1,2,3].map(i => (
                   <div key={i} className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-muted/50">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded">
                         <FileText className="h-6 w-6" />
                      </div>
                      <div className="overflow-hidden">
                         <p className="text-sm font-medium truncate">Specification_v{i}.pdf</p>
                         <p className="text-xs text-muted-foreground">2.4 MB</p>
                      </div>
                   </div>
                ))}
             </div>
         </TabsContent>

         <TabsContent value="settings" className="max-w-2xl">
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-lg font-medium">Cài đặt dự án</h3>
                  <p className="text-sm text-muted-foreground">Quản lý các thiết lập chung cho dự án này.</p>
               </div>
               
               <div className="space-y-4 border p-6 rounded-lg">
                  <div className="space-y-2">
                     <Label>Tên dự án</Label>
                     <Input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Mô tả</Label>
                     <Textarea 
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                        className="min-h-[100px]"
                     />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                     <Button 
                        onClick={() => updateProjectMutation.mutate(formData)}
                        disabled={updateProjectMutation.isPending}
                     >
                        <Save className="mr-2 h-4 w-4" /> 
                        {updateProjectMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                     </Button>
                  </div>
               </div>

               <div className="border border-red-200 bg-red-50 p-6 rounded-lg space-y-4">
                  <h4 className="font-medium text-red-900">Vùng nguy hiểm</h4>
                  <p className="text-sm text-red-700">Các hành động dưới đây không thể hoàn tác. Vui lòng cân nhắc kỹ.</p>
                  <Button variant="destructive">Lưu trữ dự án</Button>
               </div>
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
}
