# Student Task Manager - Frontend

A clean, responsive React frontend for managing student tasks. Built with React (Vite), TypeScript, Tailwind CSS, and Axios.

## 🚀 Features

- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- 🔍 **Search & Filter**: Filter by status (all/pending/completed), sort by date/priority
- ⚡ **Optimistic Updates**: Instant UI feedback with rollback on errors
- 📱 **Responsive Design**: Mobile-first approach, works on all devices
- 🎨 **Priority Badges**: Visual indicators for low/medium/high priority
- ⏰ **Due Date Tracking**: Overdue indicators for past-due tasks
- 🔔 **Toast Notifications**: Feedback for all user actions

## 📁 Project Structure

```
src/
├── api/
│   └── api.ts              # Axios instance & API methods
├── components/
│   ├── task/
│   │   ├── Header.tsx      # App header
│   │   ├── AddTaskForm.tsx # Form to create new tasks
│   │   ├── TaskList.tsx    # List container
│   │   ├── TaskCard.tsx    # Individual task card
│   │   ├── FilterBar.tsx   # Search, filter, sort controls
│   │   ├── EditTaskModal.tsx  # Edit task dialog
│   │   ├── DeleteConfirmDialog.tsx # Delete confirmation
│   │   ├── EmptyState.tsx  # No tasks placeholder
│   │   ├── Loader.tsx      # Loading spinner
│   │   ├── ErrorBanner.tsx # Error display
│   │   ├── PriorityBadge.tsx # Priority indicator
│   │   └── Toast.tsx       # Toast notifications
│   └── ui/                 # Shadcn UI components
├── pages/
│   └── Index.tsx           # Main application page
├── App.tsx
└── main.tsx
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ or Bun
- A running backend API (see API Endpoints below)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. Open http://localhost:5173 in your browser

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

### Pointing to Deployed Backend

For production or connecting to a deployed backend:

```env
VITE_API_BASE_URL=https://your-api.example.com/api
```

## 📡 API Endpoints Required

The frontend expects these endpoints from your backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks |
| `GET` | `/tasks?status=pending&sort=dueDate&order=asc&q=search` | Get filtered tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update a task |
| `PATCH` | `/tasks/:id/toggle` | Toggle task completion |
| `DELETE` | `/tasks/:id` | Delete a task |

### Task Object Schema

```typescript
interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;       // ISO date string
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 📋 Screenshots Checklist

- [ ] Task list with multiple tasks
- [ ] Empty state (no tasks)
- [ ] Add task form expanded
- [ ] Edit task modal
- [ ] Delete confirmation dialog
- [ ] Filter bar with search active
- [ ] Task with overdue indicator
- [ ] Mobile responsive view
- [ ] Error state with retry button
- [ ] Loading state

## 🎨 Customization

### Colors

Edit `src/index.css` to customize the color scheme. All colors use HSL format.

### Components

UI components are built on Shadcn UI and can be found in `src/components/ui/`.

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Shadcn UI** - Component library
- **Lucide React** - Icons
- **date-fns** - Date utilities

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📄 License

MIT
