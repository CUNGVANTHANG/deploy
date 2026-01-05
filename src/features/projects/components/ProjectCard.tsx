import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Project } from "@/types";
import { ArrowRight, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
           <div className="space-y-1">
             <CardTitle className="text-lg">{project.name}</CardTitle>
             <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                  {project.code}
                </Badge>
                {project.status === 'ARCHIVED' && <Badge variant="secondary">Lưu trữ</Badge>}
             </div>
           </div>
           <Button variant="ghost" size="icon" className="-mr-2">
             <MoreVertical className="h-4 w-4 text-muted-foreground" />
           </Button>
        </div>
        <CardDescription className="line-clamp-2 min-h-[40px] mt-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
         <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Tiến độ</span>
            <span>{project.progress}%</span>
         </div>
         <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${project.progress}%` }} 
            />
         </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
         <div className="flex -space-x-2">
            {project.memberIds.map(mid => (
              <Avatar key={mid} className="h-7 w-7 border-2 border-background">
                <AvatarFallback className="text-[10px]">U</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium border-2 border-background">
               +1
            </div>
         </div>
         <Button asChild size="sm" className="gap-2">
            <Link to={`/projects/${project.id}`}>
               Mở dự án <ArrowRight className="h-3 w-3" />
            </Link>
         </Button>
      </CardFooter>
    </Card>
  );
}
