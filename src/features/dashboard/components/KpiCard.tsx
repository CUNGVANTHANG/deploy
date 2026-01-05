import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
  iconName: string;
}

export function KpiCard({ label, value, trend, trendUp, iconName }: KpiCardProps) {
  // Dynamic icon
  const Icon = (Icons as any)[iconName] as LucideIcon;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
           <div className="flex flex-col space-y-1">
             <span className="text-sm font-medium text-muted-foreground">{label}</span>
             <span className="text-2xl font-bold">{value}</span>
           </div>
           <div className={cn("p-2 rounded-full opacity-80", "bg-primary/5 text-primary")}>
              {Icon && <Icon className="h-5 w-5" />}
           </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
           {trendUp !== undefined && (
             trendUp 
               ? <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
               : <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
           )}
           <span className={cn("font-medium", trendUp ? "text-emerald-500" : "text-muted-foreground")}>
             {trend}
           </span>
        </div>
      </CardContent>
    </Card>
  );
}
