import { MOCK_STATS, MOCK_RECENT_TASKS, MOCK_UPCOMING } from "@/mocks/dashboard";

export const dashboardService = {
    getStats: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_STATS;
    },
    getRecentTasks: async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_RECENT_TASKS;
    },
    getUpcomingEvents: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_UPCOMING;
    }
};
