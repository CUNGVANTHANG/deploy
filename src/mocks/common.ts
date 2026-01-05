import { Tenant, User } from "@/types";

export const MOCK_TENANTS: Tenant[] = [
    { id: 't1', name: 'Good Team', slug: 'good-team', themeAccent: 'blue-600' },
    { id: 't2', name: 'FUSION Demo', slug: 'fusion-demo', themeAccent: 'violet-600' },
    { id: 't3', name: 'Acme Client', slug: 'acme-inc', themeAccent: 'emerald-600' },
];

export const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Hòa', email: 'hoa@fusion.com', role: 'PM', avatarColor: 'bg-blue-500', title: 'Product Manager', department: 'Product', location: 'Hanoi', phone: '0912345678', bio: 'Passionate about building great products.' },
    { id: 'u2', name: 'Sarah', email: 'sarah@fusion.com', role: 'CONTRIBUTOR', avatarColor: 'bg-green-500', title: 'Frontend Developer', department: 'Engineering', location: 'Remote' },
    { id: 'u3', name: 'Mike', email: 'mike@fusion.com', role: 'REVIEWER', avatarColor: 'bg-amber-500', title: 'QA Engineer', department: 'Engineering' },
    { id: 'u4', name: 'David', email: 'david@client.com', role: 'CUSTOMER', avatarColor: 'bg-purple-500', title: 'Client Manager', department: 'Sales' },
];

export const CURRENT_USER_ID = 'u1';
