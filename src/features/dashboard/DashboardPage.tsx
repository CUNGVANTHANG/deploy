import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { KpiCard } from "./components/KpiCard";
import { RecentTasks } from "./components/RecentTasks";
import { UpcomingEvents } from "./components/UpcomingEvents";

export default function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getStats
  });

  const { data: tasks } = useQuery({
    queryKey: ['dashboard', 'recentTasks'],
    queryFn: dashboardService.getRecentTasks
  });

  const { data: upcoming } = useQuery({
    queryKey: ['dashboard', 'upcoming'],
    queryFn: dashboardService.getUpcomingEvents
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats ? stats.map((stat: any, index: number) => (
           <KpiCard key={index} {...stat} iconName={stat.icon} />
        )) : (
           // Skeleton Loading (Simplified)
           Array(4).fill(0).map((_, i) => (
             <div key={i} className="h-32 rounded-xl bg-muted/50 animate-pulse" />
           ))
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
         {/* Left Column: Recent Tasks */}
         {tasks ? <RecentTasks tasks={tasks} /> : (
            <div className="col-span-2 h-64 rounded-xl bg-muted/50 animate-pulse" />
         )}

         {/* Right Column: Upcoming & Quick Actions */}
         <div className="space-y-8">
            {upcoming ? <UpcomingEvents events={upcoming} /> : (
               <div className="h-64 rounded-xl bg-muted/50 animate-pulse" />
            )}
         </div>
      </div>
    </div>
  );
}
