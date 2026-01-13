import { ClipboardList, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddTask: () => void;
  isFiltered?: boolean;
}

const EmptyState = ({ onAddTask, isFiltered }: EmptyStateProps) => {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No matching tasks</h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Start by adding your first task to stay organized and track your progress.
      </p>
      <Button onClick={onAddTask}>
        <Plus className="w-4 h-4 mr-2" />
        Add your first task
      </Button>
    </div>
  );
};

export default EmptyState;
