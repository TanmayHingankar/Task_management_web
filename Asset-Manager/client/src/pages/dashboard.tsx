import { useState } from "react";
import { useTasks, useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { Task } from "@shared/schema";
import { Layout } from "@/components/layout";
import { TaskCard } from "@/components/task-card";
import { TaskDialog } from "@/components/task-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, LayoutGrid, List, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardProps {
  initialStatus?: "pending" | "in_progress" | "completed";
}

export default function Dashboard({ initialStatus }: DashboardProps) {
  // State
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus || "all");
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // Queries & Mutations
  const { data: tasks, isLoading } = useTasks({ 
    search: search || undefined,
    sort,
    status: statusFilter !== "all" ? (statusFilter as any) : undefined
  });
  
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  // Handlers
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setCreateDialogOpen(true);
  };

  const handleStatusChange = (id: number, status: string) => {
    updateTask.mutate({ id, status: status as any });
  };

  const handleDelete = async () => {
    if (deletingTask) {
      await deleteTask.mutateAsync(deletingTask.id);
      setDeletingTask(null);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setCreateDialogOpen(open);
    if (!open) setEditingTask(null);
  };

  return (
    <Layout>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-display">
            {initialStatus === "completed" ? "Completed Tasks" : 
             initialStatus === "pending" ? "Pending Tasks" : "Dashboard"}
          </h2>
          <p className="text-muted-foreground mt-1">Manage and track your productivity</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="shrink-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks..." 
            className="pl-9 bg-background" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {!initialStatus && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select value={sort} onValueChange={(v: any) => setSort(v)}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>

          <div className="border-l border-border pl-2 flex gap-1 bg-background rounded-lg p-1 border">
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : tasks && tasks.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TaskCard 
                  task={task} 
                  onEdit={handleEdit} 
                  onDelete={setDeletingTask}
                  onStatusChange={handleStatusChange}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <List className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-semibold">No tasks found</h3>
          <p className="text-muted-foreground max-w-sm">
            {search || statusFilter !== "all" 
              ? "Try adjusting your filters or search query to find what you're looking for." 
              : "You haven't created any tasks yet. Get started by creating your first task."}
          </p>
          {!search && statusFilter === "all" && (
            <Button onClick={() => setCreateDialogOpen(true)} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Create First Task
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <TaskDialog 
        open={createDialogOpen} 
        onOpenChange={handleDialogClose} 
        task={editingTask}
      />

      <AlertDialog open={!!deletingTask} onOpenChange={(open) => !open && setDeletingTask(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              "{deletingTask?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
