# 📚 Student Task Manager

A modern, full-stack task management application built specifically for students to organize, track, and manage their academic tasks efficiently. Features a beautiful UI, powerful filtering, and seamless real-time updates.

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-ISC-blue)
![Node](https://img.shields.io/badge/Node.js-v14+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

## 🌟 Features

### ✨ Core Functionality

- **📝 Task Management**: Create, read, update, and delete tasks with ease
- **✅ Task Completion**: Toggle task status with a single click
- **🎯 Priority Levels**: Organize tasks by priority (Low, Medium, High)
- **📅 Due Dates**: Set and track task deadlines
- **🔍 Search**: Real-time search across task titles and descriptions
- **🎨 Filter & Sort**: Filter by status and sort by date, priority, or creation time

### 🎨 User Experience

- **💅 Modern UI**: Clean, intuitive interface built with TailwindCSS and shadcn/ui
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌈 Visual Feedback**: Color-coded priority badges and status indicators
- **⚡ Real-time Updates**: Instant UI updates without page refresh
- **🚨 Error Handling**: Graceful error messages and retry mechanisms

### 🔧 Technical Features

- **🔐 Input Validation**: Comprehensive validation on both frontend and backend
- **🛡️ XSS Protection**: Input sanitization to prevent security vulnerabilities
- **🌐 CORS Enabled**: Secure cross-origin resource sharing
- **📊 MongoDB Atlas**: Cloud-based database with automatic scaling
- **🔄 Auto-Restart**: Development server with hot-reload capability
- **📝 Request Logging**: Comprehensive logging for debugging and monitoring

---

## 🚀 Tech Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: TailwindCSS 3.x
- **UI Components**: shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js 14+
- **Framework**: Express.js 4.x
- **Database**: MongoDB Atlas (Mongoose ODM 8.x)
- **CORS**: CORS middleware
- **Logging**: Morgan
- **Environment**: dotenv
- **Development**: Nodemon

### DevOps & Tools

- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **API Testing**: Postman-ready endpoints

---

## 📁 Project Structure

```
Enginow/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts          # Axios API client with interceptors
│   │   ├── components/
│   │   │   ├── task/           # Task-specific components
│   │   │   │   ├── AddTaskForm.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   ├── EditTaskModal.tsx
│   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── ErrorBanner.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── PriorityBadge.tsx
│   │   │   │   └── Toast.tsx
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Index.tsx       # Main application page
│   │   │   └── NotFound.tsx    # 404 page
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/
│   │   │   └── utils.ts        # Utility functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                     # Node.js backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection with retry logic
│   │   ├── models/
│   │   │   └── Task.js         # Mongoose Task schema
│   │   ├── routes/
│   │   │   └── taskRoutes.js   # API route definitions
│   │   ├── controllers/
│   │   │   └── taskController.js # Request handlers & business logic
│   │   ├── middleware/
│   │   │   └── errorHandler.js # Global error handling
│   │   ├── app.js              # Express app configuration
│   │   └── server.js           # Server entry point
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── README_BACKEND.md       # Backend-specific documentation
│
└── README.md                    # This file
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Amanparashar-09/P1-Enginow.git
cd P1-Enginow
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your credentials:**

   ```env
   # Server Configuration
   PORT=5000

   # MongoDB Configuration
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/student-tasks?retryWrites=true&w=majority

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173,http://localhost:8081

   # Node Environment
   NODE_ENV=development
   ```

5. **Get MongoDB Connection String:**

   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a cluster (free tier available)
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace username, password, and database name in `.env`

6. **Start the backend server:**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   ✅ MongoDB Connected: cluster.mongodb.net
   📊 Database: student-tasks
   🚀 Server running in development mode
   📡 Listening on port 5000
   ```

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173` or the port shown in terminal
   - The application should load and connect to the backend

---

## 🎯 Usage

### Creating a Task

1. Click the **"Add a new task"** button or **"Add your first task"** in empty state
2. Fill in the task details:
   - **Title** (required): Brief description of the task
   - **Description** (optional): Additional details
   - **Priority**: Choose Low, Medium, or High
   - **Due Date** (optional): Set a deadline
3. Click **"Add Task"** to save

### Managing Tasks

- **✅ Complete Task**: Click the checkbox to mark as complete
- **✏️ Edit Task**: Click the edit icon to modify details
- **🗑️ Delete Task**: Click the delete icon and confirm
- **🔍 Search**: Use the search bar to find tasks
- **🎨 Filter**: Toggle between All, Pending, and Completed tasks
- **📊 Sort**: Sort by creation date, due date, or priority

### Keyboard Shortcuts

- `Esc` - Close modal/dialog
- `Enter` - Submit form (when focused)

---

## 🔌 API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

#### 1. Get All Tasks

```http
GET /api/tasks
```

**Query Parameters:**

- `status` - Filter by status (`all`, `pending`, `completed`)
- `sort` - Sort by field (`createdAt`, `dueDate`, `priority`)
- `order` - Sort order (`asc`, `desc`)
- `q` - Search query (searches title and description)

**Example:**

```bash
GET /api/tasks?status=pending&sort=dueDate&order=asc&q=assignment
```

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "659a1b2c3d4e5f6g7h8i9j0k",
      "title": "Complete Math Assignment",
      "description": "Chapter 5 problems 1-20",
      "priority": "high",
      "dueDate": "2026-01-20T23:59:59.000Z",
      "completed": false,
      "createdAt": "2026-01-13T10:30:00.000Z",
      "updatedAt": "2026-01-13T10:30:00.000Z"
    }
  ]
}
```

#### 2. Create Task

```http
POST /api/tasks
```

**Request Body:**

```json
{
  "title": "Complete Math Assignment",
  "description": "Chapter 5 problems 1-20",
  "priority": "high",
  "dueDate": "2026-01-20T23:59:59.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    /* task object */
  },
  "message": "Task created successfully"
}
```

#### 3. Get Task by ID

```http
GET /api/tasks/:id
```

#### 4. Update Task

```http
PUT /api/tasks/:id
```

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "medium",
  "dueDate": "2026-01-25T23:59:59.000Z",
  "completed": true
}
```

#### 5. Toggle Task Completion

```http
PATCH /api/tasks/:id/toggle
```

#### 6. Delete Task

```http
DELETE /api/tasks/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": { "id": "659a1b2c3d4e5f6g7h8i9j0k" }
}
```

### Error Responses

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

**Common Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (database connection issues)

---

## 📊 Data Model

### Task Schema

```javascript
{
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 500,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: Date,  // Auto-generated
  updatedAt: Date   // Auto-generated
}
```

---

## 🧪 Testing

### Manual Testing with Postman

1. Import the collection using these endpoints
2. Set environment variable `baseUrl` to `http://localhost:5000/api`
3. Test each endpoint:
   - Create a task
   - Get all tasks
   - Filter tasks
   - Update a task
   - Toggle completion
   - Delete a task

### Frontend Testing

1. Start both backend and frontend servers
2. Test the following flows:
   - Create tasks with different priorities
   - Search for tasks
   - Filter by status
   - Sort by different fields
   - Edit existing tasks
   - Delete tasks
   - Toggle completion status

---

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

#### Deploy to Render

1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `PORT`: 5000 (or let Render auto-assign)
   - `CORS_ORIGIN`: Your deployed frontend URL
   - `NODE_ENV`: production

#### Deploy to Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI="your-mongodb-uri"
heroku config:set CORS_ORIGIN="your-frontend-url"
heroku config:set NODE_ENV="production"

# Deploy
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Vercel/Netlify)

#### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Run: `vercel`
4. Follow the prompts
5. Add environment variable:
   - `VITE_API_BASE_URL`: Your deployed backend URL

#### Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com)
2. Connect GitHub repository
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variable:
   - `VITE_API_BASE_URL`: Your deployed backend URL

---

## 🔒 Security Features

- ✅ **Input Validation**: Comprehensive validation on all inputs
- ✅ **XSS Protection**: HTML sanitization to prevent script injection
- ✅ **CORS Configuration**: Controlled cross-origin access
- ✅ **Error Handling**: No sensitive data exposed in error messages
- ✅ **MongoDB Injection Prevention**: Mongoose schema validation
- ✅ **Request Size Limits**: 10MB payload limit
- ✅ **Environment Variables**: Sensitive data in .env (not committed)

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem**: Port already in use

```
❌ Port 5000 is already in use
```

**Solution**:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Or change port in .env
PORT=5001
```

### MongoDB Connection Error

**Problem**: Can't connect to MongoDB

```
❌ MongoDB Connection Error
```

**Solutions**:

1. Check your `MONGO_URI` in `.env`
2. Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)
3. Check username and password in connection string
4. Ensure database user has read/write permissions

### CORS Error

**Problem**: Frontend can't connect to backend

```
Access to fetch blocked by CORS policy
```

**Solution**:

- Add frontend URL to `CORS_ORIGIN` in backend `.env`
- Restart backend server after changes

### Frontend Shows "Network Error"

**Solutions**:

1. Ensure backend is running on correct port
2. Check `VITE_API_BASE_URL` points to backend
3. Verify CORS configuration
4. Check browser console for detailed errors

---

## 📝 Environment Variables

### Backend (.env)

```env
# Required
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
CORS_ORIGIN=http://localhost:5173

# Optional
NODE_ENV=development
```

### Frontend (.env)

```env
# Optional - defaults to http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use TypeScript for frontend code
- Follow ESLint rules
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly

---

## 📜 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Aman Parashar**

- GitHub: [@Amanparashar-09](https://github.com/Amanparashar-09)
- Repository: [P1-Enginow](https://github.com/Amanparashar-09/P1-Enginow)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Express.js](https://expressjs.com/) - Web framework
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [API Documentation](#-api-documentation)
3. Open an issue on GitHub
4. Check backend logs for detailed error messages

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] User authentication (JWT)
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Task reminders/notifications
- [ ] Collaborative tasks (share with others)
- [ ] Calendar view
- [ ] Dark mode
- [ ] Export tasks (PDF, CSV)
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

---

## 📸 Screenshots

### Main Dashboard

![Dashboard](https://via.placeholder.com/800x450?text=Add+Screenshot)

### Task Creation

![Create Task](https://via.placeholder.com/800x450?text=Add+Screenshot)

### Task Filters

![Filters](https://via.placeholder.com/800x450?text=Add+Screenshot)

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ for students everywhere

</div>
