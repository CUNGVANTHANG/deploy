import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, FolderPlus, FilePlus } from "lucide-react";
import { UpcomingEvent } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function UpcomingEvents({ events }: { events: UpcomingEvent[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
             <Calendar className="h-4 w-4 text-purple-500" />
             Sắp diễn ra
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
           {events.map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:shadow-sm transition-all">
                 <div className={cn("mt-1.5 w-2 h-2 rounded-full shrink-0", 
                    event.category === 'RELEASE' ? 'bg-emerald-500' : 
                    event.category === 'MEETING' ? 'bg-blue-500' : 'bg-amber-500'
                 )} />
                 <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{event.category}</p>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(event.date), "dd MMM, yyyy")}</p>
                 </div>
              </div>
           ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
         <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
               <FilePlus className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">Tạo CV mới</span>
         </Button>
         <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 transition-colors">
            <div className="p-2 rounded-full bg-violet-100 text-violet-600">
               <FolderPlus className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">Tạo dự án</span>
         </Button>
      </div>
    </div>
  );
}
