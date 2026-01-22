import { Task } from "@shared/schema";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Timer, 
  Pencil, 
  Trash2 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (id: number, status: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    in_progress: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    completed: "bg-green-500/10 text-green-600 border-green-500/20",
  };

  const statusIcons = {
    pending: Clock,
    in_progress: Timer,
    completed: CheckCircle2,
  };

  const StatusIcon = statusIcons[task.status as keyof typeof statusIcons];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card hover:-translate-y-1">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <Badge 
            variant="outline" 
            className={cn("px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5", statusColors[task.status as keyof typeof statusColors])}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {task.status.replace("_", " ")}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")}>
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "in_progress")}>
                Mark In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                Mark Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(task)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-xl leading-tight line-clamp-2" title={task.title}>
            {task.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 h-[4.5rem]">
            {task.description || "No description provided."}
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="text-xs text-muted-foreground border-t pt-4 mt-2">
        <span>Created {task.createdAt ? format(new Date(task.createdAt), 'MMM d, yyyy') : 'Just now'}</span>
      </CardFooter>
    </Card>
  );
}
