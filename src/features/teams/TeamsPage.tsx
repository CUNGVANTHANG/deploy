import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamsService } from "@/services/teams.service";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TeamDetailSheet } from "./components/TeamDetailSheet";

export default function TeamsPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: teamsService.getTeams
  });

  const createTeamMutation = useMutation({
    mutationFn: teamsService.createTeam,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['teams'] });
       closeDialog();
       toast.success("Tạo nhóm thành công!");
    }
  });

  const updateTeamMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: any }) => teamsService.updateTeam(id, updates),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['teams'] });
       closeDialog();
       toast.success("Cập nhật nhóm thành công!");
    }
  });

  const closeDialog = () => {
      setIsDialogOpen(false);
      setNewTeam({ name: '', description: '' });
      setEditingTeam(null);
  };

  const handleSave = () => {
     if (!newTeam.name) return;
     
     if (editingTeam) {
        updateTeamMutation.mutate({
            id: editingTeam.id,
            updates: { ...newTeam }
        });
     } else {
        createTeamMutation.mutate({
            ...newTeam,
            tenantId: 't1', 
            memberIds: [] 
        } as any);
     }
  };

  const openCreateDialog = () => {
      setEditingTeam(null);
      setNewTeam({ name: '', description: '' });
      setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold tracking-tight">Đội nhóm</h1>
         
         <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) closeDialog();
            else setIsDialogOpen(true);
         }}>
            <DialogTrigger asChild>
               <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" /> Tạo nhóm</Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>{editingTeam ? 'Chỉnh sửa đội nhóm' : 'Tạo đội nhóm mới'}</DialogTitle>
               </DialogHeader>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                     <Label>Tên nhóm</Label>
                     <Input 
                        value={newTeam.name} 
                        onChange={e => setNewTeam({...newTeam, name: e.target.value})} 
                        placeholder="Ví dụ: Thiết kế, Marketing..."
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Mô tả</Label>
                     <Textarea 
                        value={newTeam.description} 
                        onChange={e => setNewTeam({...newTeam, description: e.target.value})} 
                        placeholder="Mô tả chức năng của nhóm..."
                     />
                  </div>
               </div>
                <DialogFooter className="flex-row justify-end gap-2">
                   <Button variant="outline" onClick={closeDialog}>Hủy</Button>
                   <Button onClick={handleSave} disabled={createTeamMutation.isPending || updateTeamMutation.isPending}>
                      {createTeamMutation.isPending || updateTeamMutation.isPending ? 'Đang lưu...' : (editingTeam ? 'Lưu thay đổi' : 'Tạo nhóm')}
                   </Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-40 bg-muted/50 rounded-lg animate-pulse" />)
         ) : teams?.map((team: any) => (
            <Card 
               key={team.id} 
               className="cursor-pointer hover:shadow-md transition-shadow"
               onClick={() => {
                  setSelectedTeam(team);
                  setIsDetailOpen(true);
               }}
            >
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{team.description || "Chưa có mô tả"}</p>
                  <div className="flex items-center justify-between pt-2 border-t">
                     <div className="flex -space-x-2">
                        {(team.memberIds || []).map((m: string) => (
                           <Avatar key={m} className="h-8 w-8 border-2 border-background">
                              <AvatarFallback>U</AvatarFallback>
                           </Avatar>
                        ))}
                     </div>
                     <span className="text-xs text-muted-foreground">{(team.memberIds || []).length} thành viên</span>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
      
      <TeamDetailSheet 
         team={selectedTeam} 
         open={isDetailOpen} 
         onOpenChange={setIsDetailOpen} 
         onEdit={(team) => {
            setIsDetailOpen(false);
            setEditingTeam(team);
            setNewTeam({ name: team.name, description: team.description });
            // Small delay to allow Sheet to close smoothly before opening Dialog
            setTimeout(() => setIsDialogOpen(true), 150);
         }}
      />
    </div>
  );
}
