import { Loader2 } from 'lucide-react';

interface LoaderProps {
  text?: string;
}

const Loader = ({ text = 'Loading tasks...' }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

export default Loader;
