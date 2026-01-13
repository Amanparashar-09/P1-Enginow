import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PriorityBadge from './PriorityBadge';
import type { Task } from '@/api/api';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const isOverdue = task.dueDate && !task.completed && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <div
      className={cn(
        'bg-card rounded-xl p-4 task-card-shadow hover:task-card-shadow-hover transition-all duration-200 border',
        task.completed && 'opacity-60',
        isOverdue && !task.completed && 'border-destructive/30'
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task._id)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium text-foreground break-words',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(task)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(task._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              'text-sm text-muted-foreground mt-1 break-words',
              task.completed && 'line-through'
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <PriorityBadge priority={task.priority} />
            
            {task.dueDate && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md',
                  isOverdue && 'bg-destructive/15 text-destructive',
                  isDueToday && !task.completed && 'bg-primary/15 text-primary',
                  !isOverdue && !isDueToday && 'bg-muted text-muted-foreground'
                )}
              >
                <Calendar className="w-3 h-3" />
                {isOverdue && 'Overdue: '}
                {isDueToday && 'Today'}
                {!isDueToday && format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
