
import { MOCK_FEEDBACK } from "@/mocks/feedback";
import { Feedback } from "@/types";
import { StorageService } from "./storage.utils";

const storage = new StorageService<Feedback>('fushion_feedback', MOCK_FEEDBACK);

export const feedbackService = {
    getFeedback: async () => {
        return storage.getAll();
    },

    submitFeedback: async (feedback: Omit<Feedback, 'id' | 'createdAt' | 'tenantId' | 'status'>) => {
        const newFeedback: Feedback = {
            ...feedback,
            id: `f${Date.now()}`,
            createdAt: new Date().toISOString(),
            tenantId: 't1', // Mock tenant
            status: 'NEW'
        };
        return storage.create(newFeedback);
    }
};
