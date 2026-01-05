import { Project } from "@/types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: 'p1', tenantId: 't1', name: 'Customer Portal', code: 'CP',
        description: 'Web portal for customers to manage their orders and support tickets.',
        status: 'ACTIVE', memberIds: ['u1', 'u2', 'u3'], progress: 65
    },
    {
        id: 'p2', tenantId: 't1', name: 'Internal Tools', code: 'INT',
        description: 'Internal admin dashboard and utilities.',
        status: 'ACTIVE', memberIds: ['u1', 'u2'], progress: 90
    },
    {
        id: 'p3', tenantId: 't1', name: 'Legacy System', code: 'LEG',
        description: 'Old system maintenance.',
        status: 'ARCHIVED', memberIds: ['u1'], progress: 100
    },
];
