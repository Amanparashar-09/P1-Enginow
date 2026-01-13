const mongoose = require('mongoose');

/**
 * Task Schema Definition
 * Represents a student task with title, description, priority, due date, and completion status
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be low, medium, or high'
      },
      default: 'medium',
      lowercase: true
    },
    dueDate: {
      type: Date,
      default: null
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
taskSchema.index({ createdAt: -1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ completed: 1 });

// Text index for search functionality
taskSchema.index({ title: 'text', description: 'text' });

/**
 * Virtual property to check if task is overdue
 */
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.completed) return false;
  return new Date() > this.dueDate;
});

/**
 * Instance method to toggle completion status
 */
taskSchema.methods.toggleComplete = function () {
  this.completed = !this.completed;
  return this.save();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
