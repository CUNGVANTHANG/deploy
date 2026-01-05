
import { MOCK_TASKS } from "@/mocks/tasks";
import { Task, TaskStatus } from "@/types";
import { StorageService } from "./storage.utils";

const storage = new StorageService<Task>('fushion_tasks', MOCK_TASKS);

export const tasksService = {
    getTasks: async (projectId?: string) => {
        const tasks = await storage.getAll();
        if (projectId) {
            return tasks.filter(t => t.projectId === projectId);
        }
        return tasks;
    },

    getTaskById: async (id: string) => {
        return storage.getById(id);
    },

    createTask: async (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: `t${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        return storage.create(newTask);
    },

    updateTask: async (id: string, updates: Partial<Task>) => {
        return storage.update(id, updates);
    },

    updateStatus: async (id: string, status: TaskStatus) => {
        return storage.update(id, { status });
    }
};
