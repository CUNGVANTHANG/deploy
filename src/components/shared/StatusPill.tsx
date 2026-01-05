import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/types";

interface StatusPillProps {
  status: TaskStatus | string;
  className?: string;
}

const STATUS_Styles: Record<string, string> = {
  TODO: "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
  REVIEW: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
  DONE: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
  // Fallbacks
  NEW: "bg-purple-50 text-purple-700 hover:bg-purple-100",
  PROCESSED: "bg-slate-100 text-slate-700 hover:bg-slate-200",
};

const STATUS_LABELS: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
  NEW: "New",
  PROCESSED: "Processed",
};

export function StatusPill({ status, className }: StatusPillProps) {
  const normalizedStatus = status.toUpperCase();
  const style = STATUS_Styles[normalizedStatus] || "bg-gray-100 text-gray-800";
  const label = STATUS_LABELS[normalizedStatus] || status;

  return (
    <Badge variant="outline" className={cn("font-medium border px-2.5 py-0.5 shadow-sm", style, className)}>
      {label}
    </Badge>
  );
}
