import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = {
    low: {
      label: 'Low',
      className: 'bg-success/15 text-success border-success/30',
    },
    medium: {
      label: 'Medium',
      className: 'bg-warning/15 text-warning border-warning/30',
    },
    high: {
      label: 'High',
      className: 'bg-destructive/15 text-destructive border-destructive/30',
    },
  };

  const { label, className } = config[priority];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border',
        className
      )}
    >
      {label}
    </span>
  );
};

export default PriorityBadge;
