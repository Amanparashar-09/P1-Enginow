import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle new API response format
api.interceptors.response.use(
  (response) => {
    // If response has success and data properties, extract data
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return {
        ...response,
        data: response.data.data || response.data
      };
    }
    return response;
  },
  (error) => {
    // Extract error message from new format
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskFilters {
  status?: 'all' | 'pending' | 'completed';
  sort?: 'dueDate' | 'priority' | 'createdAt';
  order?: 'asc' | 'desc';
  q?: string;
}

export const taskApi = {
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters?.sort) {
      params.append('sort', filters.sort);
    }
    if (filters?.order) {
      params.append('order', filters.order);
    }
    if (filters?.q) {
      params.append('q', filters.q);
    }
    const response = await api.get<Task[]>(`/tasks?${params.toString()}`);
    return response.data;
  },

  createTask: async (task: TaskInput): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<TaskInput & { completed?: boolean }>): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  toggleTask: async (id: string): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/toggle`);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
