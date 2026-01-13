const Task = require('../models/Task');
const mongoose = require('mongoose');

/**
 * Input Sanitization Helper
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  // Remove potential XSS attempts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim();
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = description ? sanitizeInput(description) : '';

    // Validate title length after sanitization
    if (sanitizedTitle.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Task title must be at least 2 characters long'
      });
    }

    // Create task object
    const taskData = {
      title: sanitizedTitle,
      description: sanitizedDescription,
      priority: priority?.toLowerCase() || 'medium',
      completed: false
    };

    // Validate priority
    if (!['low', 'medium', 'high'].includes(taskData.priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be low, medium, or high'
      });
    }

    // Add dueDate if provided
    if (dueDate) {
      const parsedDate = new Date(dueDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid due date format. Use ISO 8601 format (e.g., 2026-01-20T23:59:59.000Z)'
        });
      }
      taskData.dueDate = parsedDate;
    }

    // Create and save task
    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all tasks with filtering, sorting, and search
 * @route   GET /api/tasks
 * @access  Public
 * @query   status=all|pending|completed, sort=dueDate|priority|createdAt, order=asc|desc, q=search
 */
const getTasks = async (req, res, next) => {
  try {
    const { status = 'all', sort = 'createdAt', order = 'desc', q } = req.query;

    // Build query
    let query = {};

    // Filter by completion status
    if (status === 'pending') {
      query.completed = false;
    } else if (status === 'completed') {
      query.completed = true;
    }
    // 'all' means no filter on completed field

    // Search in title and description
    if (q && q.trim().length > 0) {
      query.$or = [
        { title: { $regex: q.trim(), $options: 'i' } },
        { description: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Determine sort field and order
    const sortOrder = order === 'asc' ? 1 : -1;
    let sortField = 'createdAt';

    if (sort === 'dueDate') {
      sortField = 'dueDate';
    } else if (sort === 'priority') {
      // Custom sorting for priority: high > medium > low
      sortField = 'priority';
    } else if (sort === 'createdAt') {
      sortField = 'createdAt';
    }

    // Execute query
    let tasksQuery = Task.find(query);

    // Handle priority sorting specially
    if (sort === 'priority') {
      // Map priority to numeric value for sorting
      const tasks = await Task.find(query);
      const priorityMap = { high: 3, medium: 2, low: 1 };
      
      tasks.sort((a, b) => {
        const aVal = priorityMap[a.priority] || 0;
        const bVal = priorityMap[b.priority] || 0;
        return sortOrder === 1 ? aVal - bVal : bVal - aVal;
      });
      
      return res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } else {
      tasksQuery = tasksQuery.sort({ [sortField]: sortOrder });
    }

    const tasks = await tasksQuery;

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format'
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task by ID
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, completed } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format'
      });
    }

    // Find task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Update fields if provided
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: 'Task title cannot be empty'
        });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (priority !== undefined) {
      const normalizedPriority = priority.toLowerCase();
      if (!['low', 'medium', 'high'].includes(normalizedPriority)) {
        return res.status(400).json({
          message: 'Priority must be low, medium, or high'
        });
      }
      task.priority = normalizedPriority;
    }

    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        task.dueDate = null;
      } else {
        const parsedDate = new Date(dueDate);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            message: 'Invalid due date format'
          });
        }
        task.dueDate = parsedDate;
      }
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    // Save updated task
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle task completion status
 * @route   PATCH /api/tasks/:id/toggle
 * @access  Public
 */
const toggleTaskComplete = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format'
      });
    }

    // Find task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Toggle completion
    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: `Task marked as ${updatedTask.completed ? 'completed' : 'pending'}`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task by ID
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format'
      });
    }

    // Find and delete task
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: task._id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  toggleTaskComplete,
  deleteTask
};
