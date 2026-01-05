import { Feedback } from "@/types";

export const MOCK_FEEDBACK: Feedback[] = [
    { id: 'f1', tenantId: 't1', fromName: 'Alice Client', fromEmail: 'alice@client.com', title: 'Cannot login on mobile', message: 'The login button is hidden on iPhone SE.', type: 'BUG', priority: 'HIGH', status: 'NEW', createdAt: '2026-01-02' },
    { id: 'f2', tenantId: 't1', fromName: 'Bob User', fromEmail: 'bob@user.com', title: 'Need dark mode', message: 'Please add dark mode support.', type: 'FEATURE', priority: 'LOW', status: 'PROCESSED', createdAt: '2025-12-20' },
];
