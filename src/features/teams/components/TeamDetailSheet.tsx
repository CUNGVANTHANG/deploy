import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, User } from "lucide-react";
import { MOCK_USERS } from "@/mocks/common";

interface TeamDetailSheetProps {
  team: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (team: any) => void;
}

export function TeamDetailSheet({ team, open, onOpenChange, onEdit }: TeamDetailSheetProps) {
  if (!team) return null;

  const members = (team.memberIds || []).map((id: string) => 
     MOCK_USERS.find(u => u.id === id) || { id, name: 'Unknown User', email: '', role: 'MEMBER' } 
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
       <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
             <SheetTitle className="text-xl">{team.name}</SheetTitle>
             <SheetDescription>
                {team.description || "Không có mô tả"}
             </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-6">
             {/* Stats */}
             <div className="flex gap-4">
                <div className="bg-muted/50 p-3 rounded-lg flex-1 text-center">
                   <div className="text-2xl font-bold">{members.length}</div>
                   <div className="text-xs text-muted-foreground uppercase font-semibold">Thành viên</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex-1 text-center">
                   <div className="text-2xl font-bold">12</div>
                   <div className="text-xs text-muted-foreground uppercase font-semibold">Dự án</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex-1 text-center">
                   <div className="text-2xl font-bold">85%</div>
                   <div className="text-xs text-muted-foreground uppercase font-semibold">Hiệu suất</div>
                </div>
             </div>

             <Separator />

             {/* Members List */}
             <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                   <User className="h-4 w-4" /> Thành viên ({members.length})
                </h3>
                <ScrollArea className="h-[300px] pr-4">
                   <div className="space-y-3">
                      {members.map((member: any) => (
                         <div key={member.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                               <Avatar>
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                               </Avatar>
                               <div>
                                  <div className="text-sm font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                     <Mail className="h-3 w-3" /> {member.email}
                                  </div>
                               </div>
                            </div>
                            <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'} className="text-[10px]">
                               {member.role}
                            </Badge>
                         </div>
                      ))}
                   </div>
                </ScrollArea>
             </div>
             
             <Separator />

             {/* Actions */}
             <div className="flex justify-end gap-2">
                <Button variant="outline">Rời nhóm</Button>
                <Button onClick={() => onEdit?.(team)}>Chỉnh sửa</Button>
             </div>
          </div>
       </SheetContent>
    </Sheet>
  );
}
