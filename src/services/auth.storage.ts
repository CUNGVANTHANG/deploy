
import { User } from "@/types";
import { MOCK_USERS } from "@/mocks/common";

const STORAGE_KEY = 'fushion_users';
const CURRENT_USER_KEY = 'fushion_current_user';

export interface AuthResponse {
    user: User;
    token: string;
}

class AuthStorageService {
    private getUsers(): User[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with mock users if empty
            localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USERS));
            return MOCK_USERS;
        }
        return JSON.parse(stored);
    }

    private saveUsers(users: User[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    getCurrentUser(): User | null {
        const stored = localStorage.getItem(CURRENT_USER_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    setCurrentUser(user: User) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    async login(email: string, _password: string): Promise<User> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = this.getUsers();
        // In a real app we would hash passwords. Here we just strictly match for the mock.
        // Since our mock users don't have passwords in the type, we'll assume any password works for them
        // OR we can just check if user exists for now.
        // For a "real" feel, let's just check email existence.
        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error("Thông tin đăng nhập không chính xác (User not found).");
        }

        this.setCurrentUser(user);
        return user;
    }

    async register(data: { name: string; email: string; password: string }): Promise<User> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = this.getUsers();
        if (users.find(u => u.email === data.email)) {
            throw new Error("Email đã được sử dụng.");
        }

        const newUser: User = {
            id: `u${Date.now()}`,
            name: data.name,
            email: data.email,
            role: 'REVIEWER', // Default role
            avatarColor: 'bg-emerald-500', // Random color could be better
            status: 'ACTIVE'
        };

        users.push(newUser);
        this.saveUsers(users);
        this.setCurrentUser(newUser);

        return newUser;
    }

    async forgotPassword(email: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 800));

        // Just check if email exists to simulate validity
        const users = this.getUsers();
        const user = users.find(u => u.email === email);

        // For security reasons, usually we don't reveal if user exists, but for this mock we can.
        if (!user) {
            // Silent success or throw error? Let's throw for UI feedback in this demo.
            throw new Error("Không tìm thấy tài khoản với email này.");
        }

        // In a real app, send email here.
    }
}

export const authStorageService = new AuthStorageService();
