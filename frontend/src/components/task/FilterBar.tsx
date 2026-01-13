import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { TaskFilters } from '@/api/api';

interface FilterBarProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  taskCount: number;
}

const FilterBar = ({ filters, onFiltersChange, taskCount }: FilterBarProps) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ] as const;

  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.q || ''}
          onChange={(e) => onFiltersChange({ ...filters, q: e.target.value })}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex bg-muted rounded-lg p-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFiltersChange({ ...filters, status: option.value })}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                filters.status === option.value || (!filters.status && option.value === 'all')
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onFiltersChange({ ...filters, sort: option.value })}
                  className={cn(
                    filters.sort === option.value && 'bg-accent'
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    order: filters.order === 'asc' ? 'desc' : 'asc',
                  })
                }
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                {filters.order === 'asc' ? 'Ascending' : 'Descending'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-sm text-muted-foreground">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
