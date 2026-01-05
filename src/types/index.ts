export type Role = 'SYSTEM_ADMIN' | 'PM' | 'CONTRIBUTOR' | 'REVIEWER' | 'CUSTOMER';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl?: string;
    avatarColor?: string; // tailwind color class e.g., 'bg-red-500'
    phone?: string;
    bio?: string;
    location?: string;
    department?: string;
    title?: string;
}

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    themeAccent?: string;
    logo?: string;
}

export interface Project {
    id: string;
    tenantId: string;
    name: string;
    code: string; // e.g., 'CP' for Customer Portal
    description: string;
    status: 'ACTIVE' | 'ARCHIVED';
    memberIds: string[];
    progress?: number;
}

export interface Team {
    id: string;
    tenantId: string;
    name: string;
    memberIds: string[];
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskType = 'FEATURE' | 'BUG' | 'IMPROVEMENT';

export interface Task {
    id: string;
    projectId: string; // can be null if independent? No, usually linked to project or default.
    projectCode: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    type: TaskType;
    assigneeId?: string;
    dueDate?: string; // ISO date
    tags: string[];
    createdAt: string;
}

export interface Feedback {
    id: string;
    tenantId: string;
    fromName: string;
    fromEmail: string;
    title: string;
    message: string;
    type: 'BUG' | 'FEATURE' | 'SUPPORT';
    priority: TaskPriority;
    status: 'NEW' | 'PROCESSED';
    createdAt: string;
    attachments?: string[];
}

export interface UpcomingEvent {
    id: string;
    tenantId: string;
    title: string;
    date: string; // ISO
    category: 'RELEASE' | 'MEETING' | 'PLANNING';
}
