# Student Task Manager - Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing student tasks.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Environment Management**: dotenv
- **CORS**: cors
- **Logging**: morgan
- **Development**: nodemon

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── models/
│   │   └── Task.js               # Task schema and model
│   ├── routes/
│   │   └── taskRoutes.js         # API route definitions
│   ├── controllers/
│   │   └── taskController.js     # Request handlers and business logic
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handling
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
├── .env                          # Environment variables (create from .env.example)
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies and scripts
└── README_BACKEND.md             # This file
```

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/student-tasks?retryWrites=true&w=majority

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Node Environment
NODE_ENV=development
```

### 3. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account or sign in
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and database name in your `.env` file

### 4. Run the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Task Endpoints

| Method | Endpoint            | Description       | Query Params                   |
| ------ | ------------------- | ----------------- | ------------------------------ |
| GET    | `/`                 | Health check      | -                              |
| POST   | `/tasks`            | Create new task   | -                              |
| GET    | `/tasks`            | Get all tasks     | `status`, `sort`, `order`, `q` |
| GET    | `/tasks/:id`        | Get task by ID    | -                              |
| PUT    | `/tasks/:id`        | Update task       | -                              |
| PATCH  | `/tasks/:id/toggle` | Toggle completion | -                              |
| DELETE | `/tasks/:id`        | Delete task       | -                              |

### Query Parameters for GET /tasks

- `status`: Filter by status (`all`, `pending`, `completed`)
- `sort`: Sort by field (`createdAt`, `dueDate`, `priority`)
- `order`: Sort order (`asc`, `desc`)
- `q`: Search in title and description

## 📝 API Usage Examples

### 1. Create a Task

```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Complete Math Assignment",
  "description": "Chapter 5 problems 1-20",
  "priority": "high",
  "dueDate": "2026-01-20T23:59:59.000Z"
}
```

**Response (201 Created):**

```json
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
```

### 2. Get All Tasks

```bash
GET http://localhost:5000/api/tasks
```

**With filters:**

```bash
GET http://localhost:5000/api/tasks?status=pending&sort=dueDate&order=asc
```

**Response (200 OK):**

```json
[
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
```

### 3. Get Task by ID

```bash
GET http://localhost:5000/api/tasks/659a1b2c3d4e5f6g7h8i9j0k
```

### 4. Update Task

```bash
PUT http://localhost:5000/api/tasks/659a1b2c3d4e5f6g7h8i9j0k
Content-Type: application/json

{
  "title": "Complete Math Assignment - Updated",
  "priority": "medium",
  "completed": true
}
```

### 5. Toggle Task Completion

```bash
PATCH http://localhost:5000/api/tasks/659a1b2c3d4e5f6g7h8i9j0k/toggle
```

### 6. Delete Task

```bash
DELETE http://localhost:5000/api/tasks/659a1b2c3d4e5f6g7h8i9j0k
```

**Response (200 OK):**

```json
{
  "message": "Task deleted successfully"
}
```

### 7. Search Tasks

```bash
GET http://localhost:5000/api/tasks?q=math
```

## 🧪 Postman Testing

1. Import the following requests into Postman:

**Collection: Student Task Manager API**

- **Create Task**: POST `{{baseUrl}}/tasks`
- **Get All Tasks**: GET `{{baseUrl}}/tasks`
- **Get Pending Tasks**: GET `{{baseUrl}}/tasks?status=pending`
- **Get Completed Tasks**: GET `{{baseUrl}}/tasks?status=completed`
- **Sort by Due Date**: GET `{{baseUrl}}/tasks?sort=dueDate&order=asc`
- **Search Tasks**: GET `{{baseUrl}}/tasks?q=assignment`
- **Get Task by ID**: GET `{{baseUrl}}/tasks/:id`
- **Update Task**: PUT `{{baseUrl}}/tasks/:id`
- **Toggle Complete**: PATCH `{{baseUrl}}/tasks/:id/toggle`
- **Delete Task**: DELETE `{{baseUrl}}/tasks/:id`

2. Set environment variable:
   - `baseUrl`: `http://localhost:5000/api`

## 🐛 Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors, invalid IDs)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

**Error Response Format:**

```json
{
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## 🚀 Deployment

### Deploy to Render

1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables in Render dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or Render will auto-assign)
   - `CORS_ORIGIN`: Your deployed frontend URL
   - `NODE_ENV`: production

### Deploy to Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI="your-mongodb-uri"
   heroku config:set CORS_ORIGIN="your-frontend-url"
   heroku config:set NODE_ENV="production"
   ```
5. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Important Production Notes

- Always use environment variables for sensitive data
- Enable MongoDB Atlas IP whitelist for your deployment platform
- Update `CORS_ORIGIN` to your production frontend URL
- Consider adding rate limiting for production
- Set up monitoring and logging (e.g., Sentry, LogRocket)
- Consider adding authentication (JWT) for production use

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

## 🔒 Security Considerations

- Input validation on all endpoints
- Mongoose schema validation
- CORS configured for specific origins
- Error messages don't expose sensitive information
- MongoDB injection prevention through Mongoose

## 📞 Support

For issues or questions:

- Check MongoDB Atlas connection
- Verify environment variables
- Check server logs for errors
- Ensure frontend is running on correct port

## 📄 License

ISC
