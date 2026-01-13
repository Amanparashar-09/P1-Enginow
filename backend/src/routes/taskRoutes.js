const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  toggleTaskComplete,
  deleteTask
} = require('../controllers/taskController');

/**
 * Task Routes
 * Base path: /api/tasks
 */

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Public
router.post('/', createTask);

// @route   GET /api/tasks
// @desc    Get all tasks with optional filtering, sorting, and search
// @access  Public
router.get('/', getTasks);

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Public
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update a task by ID
// @access  Public
router.put('/:id', updateTask);

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task completion status
// @access  Public
router.patch('/:id/toggle', toggleTaskComplete);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task by ID
// @access  Public
router.delete('/:id', deleteTask);

module.exports = router;
