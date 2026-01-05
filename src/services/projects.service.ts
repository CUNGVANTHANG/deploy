
import { MOCK_PROJECTS } from "@/mocks/projects";
import { Project } from "@/types";
import { StorageService } from "./storage.utils";

const storage = new StorageService<Project>('fushion_projects', MOCK_PROJECTS);

export const projectsService = {
    getProjects: async (statusFilter?: string) => {
        const projects = await storage.getAll();
        if (statusFilter && statusFilter !== 'ALL') {
            return projects.filter(p => p.status === statusFilter);
        }
        return projects;
    },

    getProjectById: async (id: string) => {
        return storage.getById(id);
    },

    createProject: async (project: Omit<Project, 'id' | 'createdAt'>) => {
        const newProject: Project = {
            ...project,
            id: `p${Date.now()}`,
            createdAt: new Date().toISOString(),
        };
        return storage.create(newProject);
    },

    updateProject: async (id: string, updates: Partial<Project>) => {
        return storage.update(id, updates);
    },

    updateStatus: async (id: string, status: 'ACTIVE' | 'ARCHIVED') => {
        return storage.update(id, { status });
    }
};
