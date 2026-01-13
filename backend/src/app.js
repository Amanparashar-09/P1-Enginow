const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

/**
 * SECURITY & MIDDLEWARE CONFIGURATION
 */

// Trust proxy (important for deployment behind reverse proxy like Nginx, Heroku, etc.)
app.set('trust proxy', 1);

// Request logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // In production, log only errors
  app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400
  }));
}

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? function (origin, callback) {
        // In production, strictly check allowed origins
        const allowedOrigins = process.env.CORS_ORIGIN 
          ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
          : [];
        
        // Allow requests with no origin (mobile apps, Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    : true, // In development, allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Body parser middleware with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Prevent parameter pollution
app.use((req, res, next) => {
  // Remove duplicate query parameters
  Object.keys(req.query).forEach(key => {
    if (Array.isArray(req.query[key])) {
      req.query[key] = req.query[key][0];
    }
  });
  next();
});

/**
 * ROUTES
 */

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Task Manager API',
    version: '1.0.0',
    status: 'Running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/',
      tasks: '/api/tasks',
      documentation: '/api'
    }
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Task Manager API',
    version: '1.0.0',
    endpoints: [
      { method: 'POST', path: '/api/tasks', description: 'Create a new task' },
      { method: 'GET', path: '/api/tasks', description: 'Get all tasks with filters' },
      { method: 'GET', path: '/api/tasks/:id', description: 'Get task by ID' },
      { method: 'PUT', path: '/api/tasks/:id', description: 'Update task by ID' },
      { method: 'PATCH', path: '/api/tasks/:id/toggle', description: 'Toggle task completion' },
      { method: 'DELETE', path: '/api/tasks/:id', description: 'Delete task by ID' }
    ],
    queryParameters: {
      status: 'Filter by status (all, pending, completed)',
      sort: 'Sort by field (createdAt, dueDate, priority)',
      order: 'Sort order (asc, desc)',
      q: 'Search in title and description'
    }
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

/**
 * ERROR HANDLING
 */

// 404 handler - must be after all routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

module.exports = app;
