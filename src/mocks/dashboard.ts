import { Task, UpcomingEvent } from "@/types";

export const MOCK_STATS = [
    { label: 'Active Projects', value: 8, trend: '+2 this month', icon: 'FolderKanban', trendUp: true },
    { label: 'Open Tasks', value: 42, trend: '12 due today', icon: 'ListTodo', trendUp: false }, // neutral or urgent
    { label: 'Team Members', value: 15, trend: '+3 this week', icon: 'Users', trendUp: true },
    { label: 'Completion Rate', value: '87%', trend: '+5% vs last month', icon: 'PieChart', trendUp: true },
];

export const MOCK_UPCOMING: UpcomingEvent[] = [
    { id: 'ev1', tenantId: 't1', title: 'Sprint 24 Release', date: '2026-01-05', category: 'RELEASE' },
    { id: 'ev2', tenantId: 't1', title: 'Client Demo', date: '2026-01-06', category: 'MEETING' },
    { id: 'ev3', tenantId: 't1', title: 'Q1 Planning', date: '2026-01-10', category: 'PLANNING' },
];

// Recent tasks for dashboard (subset of full tasks)
export const MOCK_RECENT_TASKS: Partial<Task>[] = [
    { id: 'tk1', title: 'Implement Auth Flow', projectCode: 'CP', status: 'IN_PROGRESS', priority: 'HIGH', type: 'FEATURE' },
    { id: 'tk2', title: 'Fix CSS Bug on Login', projectCode: 'CP', status: 'REVIEW', priority: 'MEDIUM', type: 'BUG' },
    { id: 'tk3', title: 'Update dependencies', projectCode: 'INT', status: 'TODO', priority: 'LOW', type: 'IMPROVEMENT' },
    { id: 'tk4', title: 'Design Database Schema', projectCode: 'CP', status: 'DONE', priority: 'HIGH', type: 'FEATURE' },
];
