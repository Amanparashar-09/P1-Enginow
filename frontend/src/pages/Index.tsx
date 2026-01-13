import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/task/Header';
import AddTaskForm from '@/components/task/AddTaskForm';
import FilterBar from '@/components/task/FilterBar';
import TaskList from '@/components/task/TaskList';
import EmptyState from '@/components/task/EmptyState';
import Loader from '@/components/task/Loader';
import ErrorBanner from '@/components/task/ErrorBanner';
import EditTaskModal from '@/components/task/EditTaskModal';
import DeleteConfirmDialog from '@/components/task/DeleteConfirmDialog';
import { ToastContainer, type ToastData } from '@/components/task/Toast';
import { taskApi, type Task, type TaskFilters, type TaskInput } from '@/api/api';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({ status: 'all', sort: 'createdAt', order: 'desc' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskApi.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (taskInput: TaskInput) => {
    try {
      setIsSubmitting(true);
      const newTask = await taskApi.createTask(taskInput);
      setTasks((prev) => [newTask, ...prev]);
      addToast('Task created successfully', 'success');
      setShowAddForm(false);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to create task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await taskApi.toggleTask(id);
      addToast(task.completed ? 'Task marked as pending' : 'Task completed!', 'success');
    } catch (err) {
      // Rollback on error
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: task.completed } : t))
      );
      addToast('Failed to update task', 'error');
    }
  };

  const handleEditTask = async (id: string, taskInput: TaskInput) => {
    try {
      setIsSaving(true);
      const updatedTask = await taskApi.updateTask(id, taskInput);
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      setEditingTask(null);
      addToast('Task updated successfully', 'success');
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to update task', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTaskId) return;

    try {
      setIsDeleting(true);
      await taskApi.deleteTask(deletingTaskId);
      setTasks((prev) => prev.filter((t) => t._id !== deletingTaskId));
      addToast('Task deleted', 'success');
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to delete task', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingTaskId(null);
    }
  };

  const isFiltered = filters.q || (filters.status && filters.status !== 'all');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
        <div className="space-y-6">
          <AddTaskForm onSubmit={handleAddTask} isSubmitting={isSubmitting} />
          
          {!isLoading && tasks.length > 0 && (
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              taskCount={tasks.length}
            />
          )}

          {error && (
            <ErrorBanner message={error} onRetry={fetchTasks} />
          )}

          {isLoading ? (
            <Loader />
          ) : tasks.length === 0 ? (
            <EmptyState
              onAddTask={() => setShowAddForm(true)}
              isFiltered={Boolean(isFiltered)}
            />
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onEdit={setEditingTask}
              onDelete={setDeletingTaskId}
            />
          )}
        </div>
      </main>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleEditTask}
        isSaving={isSaving}
      />

      <DeleteConfirmDialog
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleDeleteTask}
        isDeleting={isDeleting}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default Index;
