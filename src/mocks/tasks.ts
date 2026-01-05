import { Task } from "@/types";

export const MOCK_TASKS: Task[] = [
    // TODO
    { id: 't1', projectId: 'p1', projectCode: 'CP', title: 'Setup CI/CD Pipeline', status: 'TODO', priority: 'HIGH', type: 'IMPROVEMENT', assigneeId: 'u2', createdAt: '2025-12-20', tags: ['devops'] },
    { id: 't2', projectId: 'p1', projectCode: 'CP', title: 'Write unit tests', status: 'TODO', priority: 'MEDIUM', type: 'IMPROVEMENT', assigneeId: 'u3', createdAt: '2025-12-21', tags: ['testing'] },

    // IN PROGRESS
    { id: 't3', projectId: 'p1', projectCode: 'CP', title: 'Implement Auth Flow', status: 'IN_PROGRESS', priority: 'HIGH', type: 'FEATURE', assigneeId: 'u1', createdAt: '2025-12-15', tags: ['auth', 'backend'] },
    { id: 't4', projectId: 'p2', projectCode: 'INT', title: 'Refactor Sidebar', status: 'IN_PROGRESS', priority: 'LOW', type: 'IMPROVEMENT', assigneeId: 'u2', createdAt: '2025-12-28', tags: ['ui'] },

    // REVIEW
    { id: 't5', projectId: 'p1', projectCode: 'CP', title: 'Fix CSS Bug on Login', status: 'REVIEW', priority: 'MEDIUM', type: 'BUG', assigneeId: 'u3', createdAt: '2025-12-25', tags: ['ui', 'bug'] },

    // DONE
    { id: 't6', projectId: 'p1', projectCode: 'CP', title: 'Design Database Schema', status: 'DONE', priority: 'HIGH', type: 'FEATURE', assigneeId: 'u1', createdAt: '2025-12-10', tags: ['db'] },
    { id: 't7', projectId: 'p2', projectCode: 'INT', title: 'Initial Setup', status: 'DONE', priority: 'URGENT', type: 'IMPROVEMENT', assigneeId: 'u1', createdAt: '2025-12-01', tags: ['setup'] },
];
