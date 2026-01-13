import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Student Task Manager</h1>
            <p className="text-sm text-muted-foreground">Stay organized, stay ahead</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
